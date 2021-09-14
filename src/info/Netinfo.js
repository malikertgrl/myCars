import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert} from "react-native";
import NetInfo from '@react-native-community/netinfo';



const Netinfo = () => {
    // const [netInfo, setNetInfo] = useState('');
    
    
    useEffect(() => {
      // Subscribe to network state updates
      const unsubscribe = NetInfo.addEventListener((state) => {
        console.log("netInfoConnection type", state.type);
        console.log("Is connected?", state.isConnected);
        // setNetInfo(
        //   `Connection type: ${state.type}
        //   Is connected?: ${state.isConnected}
        //   IP Address: ${state.details.ipAddress}`,
        // );
       
      });
  
      return () => {
        // Unsubscribe to network state updates
        unsubscribe();
      };
    }, []);

    const getNetInfo = () => {
        NetInfo.fetch().then((state) => {
            if (state.isConnected === true) {
                console.log("isConnected true")     
            } else {
                console.log(`isConnected false ${state.isConnected}` )  
                alert(
                    "internet check!"
                   );
            }
    
        })
        
        
    }
  
    // const getNetInfo = () => {
    //   // To get the network state once
    //   NetInfo.fetch().then((state) => {
    //     console.log("getNEtInfoConnection type", state.type);
    //     console.log("Is connected?", state.isConnected);
    //     alert(
    //       `Connection type: ${state.type}
    //       Is connected?: ${state.isConnected}
    //       IP Address: ${state.details.ipAddress}`,
    //     );
    //   });
    // };
  
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.header}>
            React Native NetInfo
            {'\n'}
            To Get NetInfo information
          </Text>
          <Text style={styles.textStyle}>
            Here is NetInfo to get device type
            {/* {netInfo} */}
          </Text>
          <Button
            title="Login"
            onPress={() => getNetInfo()}
          /> 
        </View>
      </View>
    );
  };
  
  const styles = {
    container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 10,
      justifyContent: 'center',
    },
    header: {
      fontSize: 22,
      fontWeight: '600',
      color: 'black',
      textAlign: 'center',
      paddingVertical: 20,
    },
    textStyle: {
      marginTop: 30,
      fontSize: 16,
      textAlign: 'center',
      color: 'black',
      paddingVertical: 20,
    },
  };
  




export default Netinfo;