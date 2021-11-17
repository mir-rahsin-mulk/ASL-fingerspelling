import matplotlib.pyplot as plt
import numpy as np
import os
from PIL import Image
import sys
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.applications.resnet50 import preprocess_input

def img_resize(width, height, img_file, new_name=None):
    img_path = os.path.join('images', img_file)
    img = Image.open(img_path)
    img = img.resize((width, height))
    if new_name != None:
        img_path = os.path.join('images', new_name)
    img.save(img_path)
    return img

def predict_image(model_file, img):
    model_path = os.path.join('models', model_file)
    model = tf.keras.models.load_model(model_path)
    model.summary()
    # Retrieve a batch of images from the test set
    # image_batch, label_batch = test_dataset.as_numpy_iterator().next()
    # predictions = model.predict_on_batch(image_batch).flatten()
    img_array  = tf.keras.preprocessing.image.img_to_array(img)
    img_batch = np.expand_dims(img_array, axis=0)
    img_preprocessed = preprocess_input(img_batch)
    prediction = model.predict_on_batch(img_batch)

    # plt.imshow(img)
    # plt.show()

def main(img_file, new_name, model_file):
    new_width, new_height  = 160, 160
    
    img = img_resize(new_width, new_height, img_file, new_name)
    predict_image(model_file, img)


main('00_4_0002.png', '00_4_0002_resized.png', 'model1.hdf5')