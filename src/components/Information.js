import React, { useLayoutEffect } from 'react';
import { View, Text, Image } from 'react-native';

const  Information = ( {navigation, route}) => {

    useLayoutEffect(() => {
        navigation.setOptions({
    
                title: route.params ? route.params.title : "Bilgiler" ,
                headerStyle: {
                  backgroundColor: '#f4511e',
                }, headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              })
        })
   
   
        return (
            <View> 
               <Text style={{fontSize:20}}> model: {route.params ? route.params.model: null }</Text> 
                <Text style={{fontSize:20}}> kilometre: {route.params ? route.params.kilometer: null }</Text> 
                 {/* <Text style={{fontSize:20}}> uri: {route.params.filePath.uri}</Text>   */}
                 <Image 
                source = {{uri: route.params ? route.params.filePath.uri: null}}
                style = {{ width: 300, height: 300, alignSelf:"center"}}
                /> 

              
            </View>
        )
    }
    const styles = {
      imageStyle: {
        width: 200,
        height: 200,
        margin: 5,
    },
    }



    export default Information;
