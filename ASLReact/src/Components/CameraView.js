'use strict';
import React, { useState, useEffect, useRef } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import { Camera } from 'expo-camera';
import RNFS from 'react-native-fs';


import * as tf from '@tensorflow/tfjs';
// import {decodeJpeg} from '@tensorflow/tfjs-react-native';
// import * as FileSystem from 'expo-file-system'

export default function CameraView () {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const cameraRef = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  
  const onSnap = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.base64;
      CameraRoll.saveToCameraRoll(data.uri);
      console.log(data.uri);
      // const fileUri = data.uri;   
      // const imgB64 = await FileSystem.readAsStringAsync(fileUri, {
      //   encoding: FileSystem.EncodingType.Base64,
      // });
      // const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
      // const raw = new Uint8Array(imgBuffer)  
      // const imageTensor = decodeJpeg(raw);


      
      // // const response = await fetch(data.uri, {}, { isBinary: true });
      // const imageDataArrayBuffer = data.uri.arrayBuffer();
      // const imageData = new Uint8Array(imageDataArrayBuffer);
      // const imageDate = '<some base64 data>';
      // const imagePath = `${RNFS.TemporaryDirectoryPath}image.jpeg`;

      // RNFS.writeFile(imagePath, source, 'base64')
      //   .then(() => console.log('Image converted to jpg and saved at ' + imagePath));

      // await tf.ready();
      // tf.image.resize_images(data.uri)
      // tf.image.resize(
      //   data.uri, (224, 224), preserve_aspect_ratio=False,
      // )
      // const image = require(source)
      // const imageTensor = decodeJpeg(imageData);
      // const model = await tf.loadLayersModel('@/Assets/Models/model.json');
      // const prediction = (await model.predict(imageTensor))[0];
      // console.log(prediction);
      this.props.navigateToScore();
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const onCameraReady = () => {
    setIsCameraReady(true);
  };
  return (
    <View style={styles.container}>
      <Camera
        style={styles.preview}
        type={type} ratio={"16:9"}
        ref={cameraRef}
        onCameraReady={onCameraReady}
      >
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity
              disabled={!isCameraReady}
              onPress={onSnap} 
              style={styles.capture}
            >
                <Text style={{ fontSize: 14 }}> SNAP </Text>
            </TouchableOpacity>
          </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
  
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