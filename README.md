# Recognition with manual RoI

A web interface for object recognition purposes by providing manual [RoI](https://deepsense.ai/region-of-interest-pooling-explained/)(Region of Interests). Region boundaries are manually specified on the image, instead of utilizing [RPN](https://arxiv.org/abs/1506.01497)(Region Proposal Network) as in Faster-RCNN. Unlike the [Faster-RCNN](https://github.com/rbgirshick/py-faster-rcnn) architecture, a one-dimensional RoI pooling layer is inserted just before the classification block by canceling the whole RPN block.

P.S. The input shape of the RoI layer can also be enhanced further.

## Dependencies
The ```requirements.txt``` file includes the list of all Python libraries that project requires ```django```, ```h5py```, ```keras```, ```numpy```, ```tensorflow``` or ```tensorflow-gpu```.

Simply install them all using the script:
```python
pip install -r requirements.txt
```

Download the file ```vgg16_weights_tf_dim_ordering_tf_kernels.h5```, imageNet weights for VGG16, from [this repo](https://github.com/fchollet/deep-learning-models/releases/tag/v0.1) and save to the directory ```\static\files_cnn\```.

## Example
| Main screen | Recognition with a single RoI |
| --- | --- |
| ![Main](https://raw.githubusercontent.com/ustundag/manual-roi/master/demo_ss/recognition_main.png) | ![Cat Recognition](https://raw.githubusercontent.com/ustundag/manual-roi/master/demo_ss/recognition_cat.png) |

## Future Work & TODOs
### Back-end
- [ ] Create a cnn_model object as a singleton
- [ ] Add a presence check also for the weights file
- [ ] Add a functionality of uploading new image
- [ ] Utilize 'img_src' attribute value instead of default image

### Front-end
- [ ] Improve the front-end design
- [ ] Disable interface once clicking the button 'Find out'
- [ ] Error thrown in case rectangle-drawing direction is not across the south-east
