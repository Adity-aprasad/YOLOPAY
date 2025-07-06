import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from './Screens/Home';
import Ginie from './Screens/Ginie';
import YoloPay from './Screens/YoloPay';
import CustomTabBar from './components/CustomTabBar';

import React,{useState} from 'react';

const Bottom = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Bottom.Navigator
       screenOptions={{ headerShown: false }}
       tabBar={(props) => <CustomTabBar {...props} />}
       initialRouteName='YoloPay'
      >
        
        <Bottom.Screen name="Ginie" component={Ginie} />
        <Bottom.Screen name="YoloPay" component={YoloPay} />
        <Bottom.Screen name="Home" component={Home} />
      </Bottom.Navigator>
    </NavigationContainer> 




  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: ORANGE, // Apply orange background to screens
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});
