import matplotlib.pyplot as plt
import numpy as np
import os
from PIL import Image
import sys
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.applications.vgg16 import preprocess_input
from tensorflow.keras.preprocessing import image

def img_resize(width, height, img_file, new_name=None):
    img_path = os.path.join('images', img_file)
    img = Image.open(img_path)
    img = img.resize((width, height))
    if new_name != None:
        img_path = os.path.join('images', new_name)
    img.save(img_path)
    return img_path

def path_to_tensor(img_path):
    img = image.load_img(img_path, target_size=(224, 224), grayscale=False)
    x = image.img_to_array(img)
    return np.expand_dims(x, axis=0)

def predict_image(model_file, img_path):
    model_path = os.path.join('models', model_file)
    model = keras.models.load_model(model_path)
    model.summary()

    print("finding tensor...")
    tensor = path_to_tensor(img_path)

    print("preprocessing...")
    img_preprocessed = preprocess_input(tensor)

    print("predicting...")
    features_test = model.predict(img_preprocessed)

    print(features_test)

    plt.imshow(Image.open(img_path))
    plt.show()
    

def main(img_file, new_name, model_file):
    new_width, new_height  = 224, 224
    
    img_path = img_resize(new_width, new_height, img_file, new_name)
    predict_image(model_file, img_path)


main('hand.jpg', 'hand_resized.jpg', 'basic_h5_model.h5')