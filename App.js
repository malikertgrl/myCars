import React, { Component } from "react";
import { View, Text } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import reducers from "./src/reducers";
import Router from "./src/navigation/Router";
import NetInfo from '@react-native-community/netinfo';
import codePush from "react-native-code-push";

//code Push deneme yapıyoum !!
// deneme github 
//projeye Redux eklentisi ekliyorum 
let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_START };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: true
    };


    this.unsubscribeNetInfo = NetInfo.addEventListener((info) => {
      console.log("netinfo 2", info)
      // this.setState({ isConnected: info.isConnected })
      // if (!info.isConnected) {
      //   alert(
      //     "internet yok!"
      //   );
      // }
    })
  }

  componentWillUnmount() {
    this.unsubscribeNetInfo();
  }

  componentDidMount() {
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE
    });
  }





  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
    if (!this.state.isConnected) {
      return (
        <View style={{ backgroundColor: "red", width: "100%", padding: 10 }}>
          <Text style={{ alignSelf: "center", color: "white", fontSize: 15 }}>İnternet bağlantısı yok</Text>
        </View>
      )
    } else {
      return (
        <Provider store={store}>
          <Router />
        </Provider>
      )

    }

    c

  }
}
export default CodePush(codePushOptions)(App);