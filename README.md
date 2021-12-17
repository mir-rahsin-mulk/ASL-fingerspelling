# ASL-fingerspelling

The model training code is in ASLPython and the android code is in ASLReactExpo folder.

# ASLPython

Create a python3 virtual environment and install the packages in Requirements.txt using pip. Then run the cells in aslModelTrainer.ipynb. The repo contains a smaller dataset using pruneData.py. Full dataset can be found at:
https://github.com/MrGeislinger/ASLTransalation/tree/main/fingerspelling/data

When the model is saved as a h5 file, you can convert the model to a TensorFlowJS compatible format using tensorflowjs_converter. Instructions here: https://www.tensorflow.org/js/guide/conversion

These files can then be dropped in the React Native app in src/assets/models.

# ASLReactExpo

You will need an android phone to run the app. An emulator will work except the camera screen. Expo CLI needs to be installed on your computer. Instructions for Exp quick start: https://reactnative.dev/docs/environment-setup

Run `yarn install` to install all the required node modules. Then use `Expo start` to start the server.

The machine learning prediction code is in src/components/CameraView.js component.
