import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
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



  const unsubscribeNetInfo = NetInfo.addEventListener((info) => {
    console.log("netinfo type: ", info.type)
    console.log("netinfo isConnected: ", info.isConnected)

    // this.setState({ isConnected: info.isConnected })
    // if (!info.isConnected) {
    //   alert(
    //     "internet yok!"
    //   );
    // }
  });
  unsubscribeNetInfo();

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        console.log("internte", state.isConnected)
        alert(`internet bağlantınızı kontrol ediniz!, isConnected: ${state.isConnected}`)
        // <View style={{ backgroundColor: "red", width: "100%", padding: 10 }}>
        //   <Text style={{ alignSelf: "center", color: "white", fontSize: 15 }}>İnternet bağlantısı yok</Text>
        // </View>

      }
    })
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