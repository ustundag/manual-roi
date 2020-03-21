from django.shortcuts import render, HttpResponse

# Main view
def index(request):
    if request.method == 'GET':
        return render(request, "index.html")
    elif request.method == 'POST':
        import json
        img_src = request.POST.get('img_src', None)
        rect = request.POST.get('rect', None)
        if isinstance(rect, str):
            rect = json.loads(rect)
            objects = recognize(img_src, rect)
            return HttpResponse(json.dumps(objects))
    # default empty response
    return HttpResponse(json.dumps({}))

# TODO create a cnn_model object as a singleton
# neural network model for object prediction
def recognize(img_src, rect):
    import warnings
    warnings.simplefilter(action='ignore', category=FutureWarning)
    from django.contrib.staticfiles import finders

    # TODO: add presence check also for weights file
    path_weights   = finders.find('files_cnn/vgg16_weights_tf_dim_ordering_tf_kernels.h5')
    path_cnn_model = finders.find('files_cnn/cnn_model.h5')

    # retrieve  model in case of cnn model presence
    if path_cnn_model:
        from keras.models import load_model
        from .recognition.roiPoolingConv import RoiPoolingConv
        cnn_model = load_model(path_cnn_model, custom_objects={'RoiPoolingConv': RoiPoolingConv})
    # create model in case of cnn model absence
    else:
        import os
        from django.conf import settings
        base_dir = settings.STATICFILES_DIRS[0]
        path_cnn_model = os.path.join(base_dir, 'files_cnn', 'cnn_model.h5')
        from .recognition.cnn import VGG16
        cnn_model = VGG16(path_cnn_model=path_cnn_model)

    cnn_model.load_weights(path_weights)
    #print(cnn_model.summary())

    # start prediction
    import numpy as np
    from keras.applications.vgg16 import preprocess_input
    from keras.preprocessing.image import img_to_array, load_img
    from keras.applications.imagenet_utils import decode_predictions

    # TODO utilize 'img_src' value here
    img_path = finders.find('media/image.png')
    print(img_path)
    print('***********************')
    print(img_src)
    img  = load_img(img_path, target_size=(224, 224))
    data = img_to_array(img)
    data = np.expand_dims(data, axis=0)
    data = preprocess_input(data)

    num_rois = 1
    rois = np.zeros((1, num_rois, 4))
    # scale down the height/width values since canvas has a dimension 600*600
    # input shape of feature maps is 14x14
    ratio = 14/600
    startX = np.floor(rect['startX']*ratio)
    startY = np.floor(rect['startY']*ratio)
    w = np.floor(rect['w']*ratio)
    h = np.floor(rect['h']*ratio)
    rois[0, 0] = [startX, startY, w, h]

    preds = cnn_model.predict([data, rois])
    P = decode_predictions(preds)

    # loop over the predictions and display the rank-5 predictions
    objects = {}
    for (i, (imagenetID, label, prob)) in enumerate(P[0]):
        objects['{}'.format(i)] = "{:.2f}%: {}".format(prob * 100, label)

    return objects
