import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/core';
import {PermissionsAndroid} from 'react-native';
import { CameraView } from '@/Components';

export const hasCameraPermission = async ()=>{    

  //result would be false if not granted and true if required permission is granted.
  const result =  await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
  return result;
}

const CameraContainer = () => {
  const isFocused = useIsFocused();

  // ...

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  } else if (hasCameraPermission !== null && isFocused) {
    return <CameraView />;
  } else {
    return null;
  }
}

export default CameraContainer