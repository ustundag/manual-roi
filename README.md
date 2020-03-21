# Recognition with manual RoI

A web interface for object recognition purposes by providing manual [RoI(region of interests)](https://deepsense.ai/region-of-interest-pooling-explained/). Region boundaries are manually specified on the image, instead of utilizing [RPN(region proposal network)](https://arxiv.org/abs/1506.01497) as in Faster-RCNN. Unlike the [Faster-RCNN](https://github.com/rbgirshick/py-faster-rcnn) architecture, a one-dimensional RoI pooling layer is inserted just before the classification block canceling the whole RPN block. 
P.S. The input shape of RoI layer can be enhanced further.

## Dependencies
The ```requirements.txt``` file includes the list of all Python libraries that project requires ```Django```, ```h5py```, ```Keras```, ```numpy```, ```tensorflow``` or ```tensorflow-gpu```.

Simply install them all using the script:
```python
pip install -r requirements.txt
```

## Example
| Main screen | Recognition with a single RoI |
| --- | --- |
| ![Main](https://raw.githubusercontent.com/ustundag/manual-roi/master/demo_ss/recognition_main.png) | ![Cat Recognition](https://raw.githubusercontent.com/ustundag/manual-roi/master/demo_ss/recognition_cat.png) |
