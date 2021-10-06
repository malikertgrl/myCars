// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import LoginForm from "../components/LoginForm";
import SigninForm from "../components/SigninForm";
import Profile from "../components/Profile";
import { navigationRef } from "./RootNavigation";


const Stack = createStackNavigator();


const Router = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="LoginForm">
        <Stack.Screen
          name="LoginForm"
          component={LoginForm}
          options={{

            title: "Giriş Ekranı",
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="SigninForm" component={SigninForm}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            title: "Kayıt Ol",
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        {/* <Stack.Screen name="cameraFunc" component={cameraFunc} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="ImagePicker" component={ImagePicker} /> */}



      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default Router;