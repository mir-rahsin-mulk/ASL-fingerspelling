'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import { RNCamera } from 'react-native-camera';

import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

class CameraView extends PureComponent {
    render() {
      return (
        <View style={styles.container}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.front}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio recording',
              message: 'We need your permission to use your audio',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
          />
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
              <Text style={{ fontSize: 14 }}> SNAP </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  
    takePicture = async () => {
      if (this.camera) {
        const options = { quality: 0.5, base64: true };
        const data = await this.camera.takePictureAsync(options);
        CameraRoll.saveToCameraRoll(data.uri);
        console.log(data.uri);

        await tf.ready();
        tf.image.resize_images(data.uri)
        tf.image.resize(
          data.uri, (224, 224), method=ResizeMethod.BILINEAR, preserve_aspect_ratio=False,
        )
        const imageTensor = decodeJpeg(imageData);
        const model2 = '@/Assets/Models/basic_h5_model.h5'
        const prediction = (await model2.predict(imageTensor))[0];
        console.log(prediction)
        this.props.navigateToScore()
      }
    };
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
  });

export default CameraView