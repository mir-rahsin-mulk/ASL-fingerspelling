import matplotlib.pyplot as plt
import numpy as np
import os
from PIL import Image
import sys
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.applications.vgg16 import preprocess_input
from tensorflow.keras.preprocessing import image
import tensorflow.keras.applications.vgg16 as vgg16

def img_resize(width, height, img_file, new_name=None):
    img_path = os.path.join('images', img_file)
    img = Image.open(img_path)
    img = img.resize((width, height))
    if new_name != None:
        img_path = os.path.join('images', new_name)
    img.save(img_path)
    return img_path

def path_to_tensor(img_path, target_size):
    img = image.load_img(img_path, target_size=target_size, grayscale=False)
    x = image.img_to_array(img)
    return np.expand_dims(x, axis=0)

# model = create_model(batch_size=64)
# mode.fit(X, y)
# weights = model.get_weights()
# single_item_model = create_model(batch_size=1)
# single_item_model.set_weights(weights)
# single_item_model.compile(compile_params)

def predict_image(model_file, img_path, target_size):
    # model_path = os.path.join('models', model_file)
    model_path = model_file
    model = keras.models.load_model(model_path)
    # model = vgg16.VGG16(weights='imagenet', include_top=False, input_shape=(224, 224, 3), classes=24)
    model.summary()

    print("finding tensor...")
    tensor = path_to_tensor(img_path, target_size).astype('float32')

    print("preprocessing...")
    img_preprocessed = preprocess_input(tensor)
    weights = model.get_weights()
    print(img_preprocessed.shape)

    # print("predicting...")
    features_test = model.predict(img_preprocessed)
    # np.squeeze(features_test)

    print(features_test)
    model.load_weights(model_path)
    test_predictions = np.argmax(features_test,axis=1)
    print(test_predictions)

    # plt.imshow(Image.open(img_path))
    # plt.show()
    

def main(img_file, new_name, model_file):
    new_width, new_height  = 224, 224
    
    img_path = img_resize(new_width, new_height, img_file, new_name)
    
    # models_dir = "models"
    # model_name = "resnet50_rgbModel_197px"
    # batchsize = "350"
    # epochs = "512"
    # model_weights_path = '{}/{}_batch{}_epoch{}.hdf5'.format(models_dir,model_name,batchsize,epochs)
    predict_image(model_file, img_path, target_size=(new_width, new_height))


main('00_4_0002.png', 'A_resized.jpg', 'models/basic_h5_model.h5')