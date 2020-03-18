from django.shortcuts import render, HttpResponse
import json

# Create your views here.
def index(request):
    if request.method == 'GET':
        return render(request, "index.html")
    elif request.method == 'POST':
        data = request.POST.get('rect', None)
        if isinstance(data, str):
            data = json.loads(data)
            print('////////////////////////////////////////')
            print(data['startX'])
            print(data['startY'])
            print(data['w'])
            print(data['h'])
            print('////////////////////////////////////////')
            objects = {}
            objects['list'] = cnn_model()
            return HttpResponse(json.dumps(objects))

# neural network model for object prediction
def cnn_model():
    return 'django'