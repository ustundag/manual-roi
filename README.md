# manual-roi

A web interface for object recognition purposes by providing manual RoI(region of interests). Region boundaries are manually specified on the image, instead of utilizing RPN(region proposal network) as in Faster-RCNN. Unlike the Faster-RCNN architecture, a one-dimensional RoI pooling layer is inserted just before the classification block canceling the whole RPN block. P.S. The input shape of RoI layer can be enhanced further.

We need two image processing libraries of python, [Pillow](https://pillow.readthedocs.io/en/4.1.x/) and [imageio](http://imageio.readthedocs.io/en/latest/installation.html) to manipulate image frames and compose a new GIF.

## Dependencies
The ```requirements.txt``` file includes the list of all Python libraries that project requires ```Django```, ```h5py```, ```Keras```, ```numpy```, ```tensorflow``` or ```tensorflow-gpu```.

Simply install them all using the script:
```python
pip install -r requirements.txt
```

## Example
| Main screen | Selecing RoI |
| --- | --- |
| ![glass.gif](https://github.com/ustundag/Progress-bar-for-GIFs/blob/master/glass.gif?raw=true) | ![progressBar_glass.gif](https://github.com/ustundag/Progress-bar-for-GIFs/blob/master/progressBar_glass.gif) |
