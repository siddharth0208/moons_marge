import React from 'react';
import {View, Text} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
export const checkInternet = () => {
  const unsubscribe = NetInfo.addEventListener(state => {
    console.log('internet', state.isConnected);
  });
  return () => {
    unsubscribe();
  };
};
