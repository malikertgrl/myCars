import auth from '@react-native-firebase/auth'
import {
    TEXTINPUT_CHANGED,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    // LOADING_ACTION

} from "./types";
import { Alert } from "react-native";
import * as RootNavigation from "../navigation/RootNavigation";



export const inputChange = ({ props, value }) => {
    return (dispatch) => {
        dispatch({
            type: TEXTINPUT_CHANGED,
            payload: { props, value }
        })
    }

}



export const loginUser = ({ email, password }) => {
    console.log("user");
    return (dispatch) => {
        dispatch({ type: LOGIN_USER })
       
        if (email === "" || password === "") {
            Alert.alert(
                "UYARI",
                "Her iki alanda dolu olmalıdır!",
                [
                    {
                        text: "Tamam",
                        onPress: () => console.log("ok Pressed"),

                    }
                ]
            );
            dispatch({
                type: LOGIN_USER_FAIL,
        
            })
        } else {
            console.log("Loginemail: ", email);
            console.log("LoginPassword: ", password);

            auth()
                .signInWithEmailAndPassword(email, password)
                .then((user) => {
                    loginSucces(dispatch, user);
                    console.log('User account created & signed in!');
                })
                .catch((e) => {
                    dispatch({
                        type: LOGIN_USER_FAIL,
                
                    })
                    console.log("hata");
                    console.log(e.code);
                    if (e.code === "auth/wrong-password" || e.code === "auth/too-many-requests") {
                        Alert.alert(
                            "UYARI",
                            "Hatalı şifre, tekrar deneyiniz.",
                            [
                                {
                                    text: "Tamam",
                                    onPress: () => console.log("ok Pressed"),
                                }
                            ]
                        );
                    }
                    else if (e.code === "auth/invalid-email") {
                        Alert.alert(
                            "UYARI",
                            "Geçersiz E-mail formatı!",
                            [
                                {
                                    text: "Tamam",
                                    onPress: () => console.log("ok Pressed"),
                                }
                            ]
                        );
                    } else if (e.code === "auth/network-request-failed") {
                        Alert.alert(
                            "UYARI",
                            "auth/network-request-failed!",
                            [
                                {
                                    text: "Tamam",
                                    onPress: () => console.log("ok Pressed"),
                                }
                            ]
                        );
                    }
                    else {
                        auth().createUserWithEmailAndPassword(email, password)
                            .then(user => loginSucces(dispatch, user))
                            .catch(() => loginFail(dispatch))
                    }
                });

            // firebase.auth().signInWithEmailAndPassword(email, password)
            //     .then(user => loginSucces(dispatch, user))
            //         // Signed in 
            //         const user = userCredential.user;
            //         // ...
            //         console.log(userCredential, user);
            //     })
            //     .catch((e) => {
            //         console.log("hata");
            //         console.log(e.code);

            //         if (e.code === "auth/wrong-password" || e.code === "auth/too-many-requests") {
            //             Alert.alert(
            //                 "UYARI",
            //                 "Hatalı şifre, tekrar deneyiniz.",
            //                 [
            //                     {
            //                         text: "Tamam",
            //                         onPress: () => console.log("ok Pressed"),

            //                     }
            //                 ]
            //             );
            //         }
            //         else if (e.code === "auth/invalid-email") {
            //             Alert.alert(
            //                 "UYARI",
            //                 "Geçersiz E-mail formatı!",
            //                 [
            //                     {
            //                         text: "Tamam",
            //                         onPress: () => console.log("ok Pressed"),

            //                     }
            //                 ]
            //             );

            //         } else if (e.code === "auth/network-request-failed") {
            //             Alert.alert(
            //                 "UYARI",
            //                 "auth/network-request-failed!",
            //                 [
            //                     {
            //                         text: "Tamam",
            //                         onPress: () => console.log("ok Pressed"),

            //                     }
            //                 ]
            //             );

            //         }
            //         else {
            //             firebase.auth().createUserWithEmailAndPassword(email, password)
            //                 .then(user => loginSucces(dispatch, user))
            //                 .catch(() => loginFail(dispatch))

            //         }


            //         // else if (e.code === "auth/user-not-found") {
            //         //     Alert.alert(
            //         //         "UYARI",
            //         //         "Yeni bir kullanıcı oluşturmak ister misiniz.",
            //         //         [
            //         //             {
            //         //                 text: "Hayır",
            //         //                 onPress: () => console.log("tıklandı")


            //         //             },
            //         //             {
            //         //                 text: "Evet",
            //         //                 onPress: () => firebase.auth().createUserWithEmailAndPassword(email, password)
            //         //                 .then((user) => loginSucces(dispatch, user))
            //         //                 .catch(() => loginFail(dispatch))

            //         //             }
            //         //         ]
            //         //     );




            //         // } 



            //     })
        }

    }
}

const loginFail = (dispatch) => {

    console.log("hatalı");
    Alert.alert(

        "UYARI",
        "Şifreniz en az 6 karakterden oluşmalıdır.",
        [
            {
                text: "Tamam",
                onPress: () => console.log("ok Pressed"),

            }
        ]
    );

    dispatch({
        type: LOGIN_USER_FAIL,

    })



}



const loginSucces = (dispatch, user) => {
    console.log("basarılı");
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user

    });
    RootNavigation.navigate('Profile')

}

