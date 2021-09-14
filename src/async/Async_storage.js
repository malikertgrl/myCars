import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Button } from '../general';



const Async_storage = () => {
  const [obj, setObj] = useState(
    {name:"malik", surname: "ertugrul", key: 1},
    {name:"malikdsd", surname: "erxcatugrul", key: 2},
    {name:"qwe", surname: "ertuarul", key: 3}
  )
  const[async2, setAsync2] = useState([])
  // const [title, setTitle] = useState(
  
  const storeData = async () => {
    try {
      const jsonValue = JSON.stringify(obj)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
      // JSON.stringify({user:"malik", surname:"ertugrul"}))
    } catch (e) {
      // saving error
    }
  }

  
const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key')
    const value = JSON.parse(jsonValue)
    if (value !== null) {
      console.log("async value", value)
      setAsync2(value.name)
      
      
      
    } else {
      null;
    }
  } catch(e) {
    // error reading value
  }
}






  return (
    <View>
      <Button
        onPress={() => storeData()}
        title="setStore "
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button
        style={{ marginTop: 20, color: "#841584" }}
        onPress={() => getData()}
        title="getStore "

        accessibilityLabel="Learn more about this purple button"
      />
        <Text>{async2}</Text>  

        <Button 
        style = {{marginTop:50}}
        title= "camera"
        onPress={() => {}}
        />
    </View>
  )
}

export default Async_storage;