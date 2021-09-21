import React from 'react'
import { View, Text, Button } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';
import RNFS from "react-native-fs";
//merge denemesi yapacağım 
const Camera = () => {

    const [{ cameraRef }, { takePicture }] = useCamera(null);

    const captureHandler = async () => {
        try {
            const data = await takePicture();
            console.log(data.uri);
            // kaydedilecek dosyayı belirliyoruz.
            const filePath = data.uri;
            const randomName = Math.random().toString();
            const newFilePath = RNFS.ExternalDirectoryPath + `/${randomName}.jpg`
            RNFS.moveFile(filePath, newFilePath)
                .then(() => {
                    console.log('image moved', filePath, 'to', newFilePath)
                })
                .catch(e => {
                    console.log(e);
                })
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <View style={styles.container}>
            <RNCamera
                style={{ flex: 1, alignItems: 'center' }}
                ref={cameraRef}
                type={RNCamera.Constants.Type.back}
                androidCameraPermissionOptions={{
                    title: 'Kamera kullanım izni',
                    message: 'Uygulamanın kameranızı kullanması için izin vermeniz gerekiyor',
                    buttonPositive: 'Tamam',
                    buttonNegative: 'İptal',
                }}
            />

            <Button
                title="Capture"
                onPress={() => captureHandler()}

            />



        </View>
    )
}

const styles = {
    container: {

        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'

    },
    buttonStyle: {
        marginLeft: 100,
        marginRight: 100



    },

}

export default Camera;