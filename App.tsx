import React,{useEffect,useState} from "react";
import {Provider} from 'react-redux';
import MainNavigation from "./src/navigation/rootNavigation";
import { store } from "./src/redux/Store";
import { checkRooted } from "./src/helper/checkRooted/checkRooted";
import KeepAwake from 'react-native-keep-awake';
import { StatusBar } from "react-native";

const App = ()=>{
  useEffect(()=>{
    checkRooted()
  },[])
  useEffect(() => {
    KeepAwake.activate(); 
    return () => {
      KeepAwake.deactivate();
    };
  }, []);
  return(
<Provider store ={store}>
<StatusBar backgroundColor="#7a42f4" barStyle="light-content" />
  <MainNavigation/>
</Provider>
  )

}
export default App