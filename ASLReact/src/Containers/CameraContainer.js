import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/core';
import {PermissionsAndroid} from 'react-native';
import { CameraView } from '@/Components';

export const hasCameraPermission = async ()=>{    

  //result would be false if not granted and true if required permission is granted.
  const result =  await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
  return result;
}

const CameraContainer = ({ route }) => {
  const { letter } = route.params
  const isFocused = useIsFocused();

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      CameraRoll.saveToCameraRoll(data.uri);
      console.log(data.uri);
      navigate('Score', {letter: letter})
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  } else if (hasCameraPermission !== null && isFocused) {
    return <CameraView takePicture={takePicture}/>;
  } else {
    return null;
  }
  
}

export default CameraContainer