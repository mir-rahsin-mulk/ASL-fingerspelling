import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/core';
import {PermissionsAndroid} from 'react-native';
import { CameraView } from '@/Components';
import { navigate } from '../Navigators/utils'

export const hasCameraPermission = async ()=>{    

  //result would be false if not granted and true if required permission is granted.
  const result =  await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
  return result;
}

const CameraContainer =({ route }) => {
  const { letter } = route.params
  const isFocused = useIsFocused();

  const navigateToScore = (predictedLetter) => {
    console.log(predictedLetter)
    navigate('Score', {letter: letter, predictedLetter: predictedLetter})
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  } else if (hasCameraPermission !== null && isFocused) {
    return <CameraView navigateToScore={navigateToScore}/>;
  } else {
    return null;
  }
  
}

export default CameraContainer