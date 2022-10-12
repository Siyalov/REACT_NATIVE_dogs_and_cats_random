import React from 'react';
import { useState } from 'react';
import { Route, Text, View } from 'react-native';
import { Checkbox, Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import 'react-native-gesture-handler';

import BreedsDescription from './pages/BreedsDescription';
import Favorites from './pages/Favorites';
import Breeds from './pages/Breeds';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Breeds"
      screenOptions={({ route }: { route: Route }) => ({
        headerShown: false,
        tabBarIcon: ({
          focused,
          color,
          size,
        }: {
          focused: boolean;
          color: string;
          size: number;
        }) => {
          let iconName;
          // https://ionic.io/ionicons
          if (route.name === 'Home') {
            iconName = 'md-home';
          } else if (route.name === 'Favorites') {
            iconName = 'md-heart';
          } else {
            iconName = 'md-apps-outline';
          }
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={Breeds} />
      <Tab.Screen name="Home2" component={BreedsDescription} />
      <Tab.Screen name="Favorites" component={Favorites} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
