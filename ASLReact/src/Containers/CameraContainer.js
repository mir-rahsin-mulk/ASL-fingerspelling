import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/core';
import {PermissionsAndroid, Text, View} from 'react-native';
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

  const navigateToScore = () => {
    navigate('Score', {letter: letter})
  }

  if (hasCameraPermission === false) {
    return <View><Text>No access to camera</Text></View>;
  } else if (hasCameraPermission !== null && isFocused) {
    return <CameraView navigateToScore={navigateToScore} letter={letter}/>;
  } else {
    return null;
  }
  
}

export default CameraContainer