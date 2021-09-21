import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, Text, Alert } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import reducers from "./src/reducers";
import Router from "./src/navigation/Router";
import NetInfo from '@react-native-community/netinfo';
import codePush from "react-native-code-push";

//merge denemesi 
let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_START };

const App = () => {


  useEffect(() => {
    const unsubscribeNetInfo = NetInfo.addEventListener((info) => {
      // console.log("netinfo type: ", info.type)
      // console.log("netinfo isConnected: ", info.isConnected)
      console.log(info.isConnected, "isConnected");

      if (!info.isConnected) {
        console.log("internet yok if koşul içi");
        Alert.alert(
          "Bağlantı Hatası",
          "İnternet bağlantınızı kontrol ediniz",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      }

      return () => unsubscribeNetInfo();
    });
  }, [])



  useEffect(() => {
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE
    });
  }, [])







  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

  return (

    <Provider store={store}>
      <Router />
    </Provider>
  )

}



export default codePush(codePushOptions)(App);