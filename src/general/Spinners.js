import React from "react";
import { View, ActivityIndicator } from "react-native";

const Spinners = () => {
  return (
    <View style = {styles.spinnerStyle}>
       <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
    
}

const styles = {
  spinnerStyle: {
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }
}

export {Spinners};