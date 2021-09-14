import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import DeviceInfo from 'react-native-device-info';
// import { getUniqueId, getBuildNumber, getApplicationName } from 'react-native-device-info';


const Device = () => {
    const [androidId, setAndroidId] = useState();
    const [buildId, setBuildId] = useState();
    const [apiLevel, setApiLevel] = useState();


    const [deviceInfo2, setDeviceInfo2] = useState("show get build")

    let appName = DeviceInfo.getApplicationName();
    let version = DeviceInfo.getVersion();


    useEffect(() => {
        DeviceInfo.getAndroidId().then((androidId) => {

            setAndroidId( androidId )
                // console.log("deviceInfo1", { ...deviceInfo, androidId: androidId })


        });
        DeviceInfo.getBuildId().then((buildId) => {

            setBuildId(buildId)
                // console.log("deviceInfo2", { ...deviceInfo, buildId: buildId })
            


        });
        DeviceInfo.getApiLevel().then((apiLevel) => {
            console.log(apiLevel);
            setApiLevel(apiLevel)
            // iOS: ?
            // Android: 25
            // Windows: ?
          });

    }, [])



    const info = () => {
        DeviceInfo.getBuildId().then((buildId) => {
            //  console.log("getAndroidId", buildId);
            return (
                // console.log("returniçi", buildId),
                setDeviceInfo2(buildId)
                // console.log("deviceInfo", {...deviceInfo,  androidId: buildId})

            )
        });
    }


    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 15, }}>Project name: {appName}</Text>
            <Text style={{ fontSize: 15, }}> version:  {version} V</Text>
            <Text style={styles.textStyle}> androidId: {androidId}</Text>
            <Text style={styles.textStyle}> buildId: {buildId}</Text>
            <Text style={styles.textStyle}> apiLevel: {apiLevel}</Text>





            <View style={{ flex: 2, alignItems: "center", justifyContent: "flex-end", margin: 20, }}>

                <Text style={styles.textStyle}>{deviceInfo2}</Text>

                <Button

                    title="Build ID göster"
                    onPress={() => info()}
                />
            </View>

            {/* <Text>uniqueId: {getUnique}</Text> */}


        </View>
    )
}
const styles = {
    textStyle: {
        alignSelf: "center",
        fontSize: 20,
        margin: 20,
        color: "red"
    }
}

export default Device;