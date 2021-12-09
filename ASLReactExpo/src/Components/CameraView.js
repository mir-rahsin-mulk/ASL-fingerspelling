import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Camera } from 'expo-camera';
// import modelJson from '@/Assets/Models/model.json';


import * as tf from '@tensorflow/tfjs';
import { fetch, decodeJpeg, bundleResourceIO } from '@tensorflow/tfjs-react-native';

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
    console.log("snapping")
    if (cameraRef.current) {
      console.log("snapping2")
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      
      await tf.ready();
      // setIsTfReady(true);

      // Start inference and show result.
      const image = require('@/Assets/Images/A.jpg');
      const imageAssetPath = Image.resolveAssetSource(image);
      console.log(imageAssetPath.uri)
      console.log(data.uri)
      const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
      const imageDataArrayBuffer = await response.arrayBuffer();
      const imageData = new Uint8Array(imageDataArrayBuffer);
      const imageTensor = decodeJpeg(imageData);
      console.log(imageTensor)
      const modelJson = require('@/Assets/Models/model.json');
      const modelWeights = require('@/Assets/Models/group1-shard1of1.bin')
      
      const model = await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights))
      console.log(model)
      const prediction = await model.classify(imageTensor);
      if (prediction && prediction.length > 0) {
        setResult(
          `${prediction[0].className} (${prediction[0].probability.toFixed(3)})`
        );
      }
      
      // const prediction = (await model.predict(data.uri))[0];
      console.log(prediction);
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