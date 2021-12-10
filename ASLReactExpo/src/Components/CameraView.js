import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
// import modelJson from '@/Assets/Models/model.json';


import * as tf from '@tensorflow/tfjs';
import { fetch, decodeJpeg, bundleResourceIO } from '@tensorflow/tfjs-react-native';

export default function CameraView ({ navigateToScore, letter}) {
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
      console.log(data.uri)

      await tf.ready();

      // resize image and make tensor
      const manipResult = await manipulateAsync(
          data.uri,
          [{ resize: { width: 224, height: 224 } }],
          { format: SaveFormat.JPEG }
      );
      const imgB64 = await FileSystem.readAsStringAsync(manipResult.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
      const raw = new Uint8Array(imgBuffer)
      const imageTensor = decodeJpeg(raw);
      const reshapedTensor = imageTensor.expandDims(0, null);
      console.log(reshapedTensor)

      // load model and make prediction
      const modelJson = require('@/Assets/Models/model.json');
      const modelWeights = require('@/Assets/Models/group1-shard1of1.bin')
      
      const model = await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights))
      model.summary()
      console.log("predicting...")
      const prediction = await model.predict([reshapedTensor]);
      const results = prediction.argMax(1).dataSync()[0]

      console.log(results);
      console.log("done")
      navigateToScore(results)
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