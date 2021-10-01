import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./Home";
import NewCar from "./NewCar";
import Device from "./Device";
import Information from "./Information";
import Icon from 'react-native-vector-icons/FontAwesome';


const Tab = createBottomTabNavigator();

function Profile() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'list-ul'

          } else if (route.name === 'NewCar') {
            iconName = 'plus-square';
          } else if (route.name === 'Device') {
            iconName = 'tablet';
          } else {
            iconName = 'info-circle';
          }
          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        initialRouteName="Home"
        name="Home"
        component={Home}
        options={{
          title: 'Güncel İlanlar',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Tab.Screen
        name="NewCar"
        component={NewCar}
        options={{
          title: "Araç Ekle",
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Tab.Screen name="Information" component={Information} />
      <Tab.Screen name="Device" component={Device}
        options={{
          title: 'Cihaz Özellikleri',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }} />


    </Tab.Navigator>

  )
}

export default Profile;