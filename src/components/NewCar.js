import React, { useState } from 'react';
import {
    Text,
    TextInput,
    Alert,
    View,
    Image,
    TouchableOpacity,
    Platform,
    PermissionsAndroid,
} from "react-native";
import { CardSection, Button } from "../general";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';



const NewCar = ({ navigation, route }) => {
    const [title, setTitle] = useState("")
    const [model, setModel] = useState("")
    const [kilometer, setKilometer] = useState("")
    const [filePath, setFilePath] = useState({})
    

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'İzin',
                        message: 'Uygulamanın kamera iznine ihtiyacı var ',
                        buttonPositive: 'Tamam',
                    },
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else return true;
    }
    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                alert('Write permission err', err);
            }
            return false;
        } else return true;
    }
    const captureImage = async (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            videoQuality: 'low',
            durationLimit: 30, //Video max duration in seconds
            saveToPhotos: true,
        };
        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
            launchCamera(options, (response) => {
                console.log('Response = ', response)
                if (response.didCancel) {
                    alert('User cancelled camera picker');
                    return;
                } else if (response.errorCode == 'camera_unavailable') {
                    alert('Camera not available on device');
                    return;
                } else if (response.errorCode == 'permission') {
                    alert('Permission not satisfied');
                    return;
                } else if (response.errorCode == 'others') {
                    alert(response.errorMessage);
                    return;
                }
                console.log('base64 -> ', response.assets[0].base64);
                console.log('uri -> ', response.assets[0].uri);
                console.log('width -> ', response.assets[0].width);
                console.log('height -> ', response.assets[0].height);
                console.log('fileSize -> ', response.assets[0].fileSize);
                console.log('type -> ', response.assets[0].type);
                console.log('fileName -> ', response.assets[0].fileName);
                setFilePath(response.assets[0]);
            });
        }
    }
    const chooseFile = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response)
            if (response.didCancel) {
                alert('User cancelled camera picker');
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                alert('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                alert('Permission not satisfied');
                return;
            } else if (response.errorCode == 'others') {
                alert(response.errorMessage);
                return;
            }
            console.log('base64 -> ', response.assets[0].base64);
            console.log('uri -> ', response.assets[0].uri);
            console.log('width -> ', response.assets[0].width);
            console.log('height -> ', response.assets[0].height);
            console.log('fileSize -> ', response.assets[0].fileSize);
            console.log('type -> ', response.assets[0].type);
            console.log('fileName -> ', response.assets[0].fileName);
            setFilePath(response.assets[0]);
        });
    }
    // const renderImage = () => {
    //     return (
    //         <Image 
    //         source={require("../Photo/dummy.png")}
    //         style={styles.imageStyle}
    //         />
    //     )
    // }
    

    // const[id, setID] = useState(1)
    return (

        <View style={styles.container}>
            <CardSection>
                <TextInput
                    placeholder="Araç ismi"
                    style={styles.inputStyle}
                    value={title}
                    onChangeText={setTitle}
                />
            </CardSection>

            <CardSection>
                <TextInput
                    placeholder="Model"
                    style={styles.inputStyle}
                    value={model}
                    onChangeText={setModel}

                />
            </CardSection>

            <CardSection>
                <TextInput
                    placeholder="KM"
                    style={styles.inputStyle}
                    value={kilometer}
                    onChangeText={setKilometer}

                />
            </CardSection>



            {/* <Text style={styles.textStyle}>{filePath.uri}</Text> */}
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.buttonStyle}
                onPress={() => captureImage('photo')}>
                <Text style={styles.textStyle}>
                    Fotoğraf için kamerayı başlat
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.buttonStyle}
                onPress={() => chooseFile('photo')}>
                <Text style={styles.textStyle}>Galeriden seç</Text>
            </TouchableOpacity>
            <Image
                source={{ uri: filePath.uri }}
                style={styles.imageStyle}
            />



            <CardSection>
                <Button onPress={() => {
                    if (title.length > 1 && title.length < 10) {

                        route.params.saveChanges({ title: title, kilometer: kilometer, model: model, key: Math.random().toString(), filePath: filePath });
                        console.log({ title, kilometer, model, filePath });
                        navigation.goBack();

                        setTitle("");
                        setModel("");
                        setKilometer("");



                    } else {
                        Alert.alert(
                            "UYARI !",
                            "En az iki, en cok 10 karakter girebilirsiniz !",
                            [
                                { text: "OK", onPress: () => console.log("OK Pressed") }
                            ]
                        );
                    }

                }}>
                    İlana Koy
                </Button>
            </CardSection>
        </View>
    )
}




const styles = {
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 20,
    },
    textStyle: {
        padding: 10,
        color: 'black',
        textAlign: 'center',
    },
    buttonStyle: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 5,
        marginVertical: 10,
        width: 250,
    },
    imageStyle: {
        width: 200,
        height: 200,
        margin: 5,
        backgroundColor:"#eeeeee"
      
    },



    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
    }

}

export default NewCar;