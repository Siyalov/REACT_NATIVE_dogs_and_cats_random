import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Text, View } from 'react-native';
import { Checkbox, Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import 'react-native-gesture-handler';

import BreedsDescription from './pages/BreedsDescription';
import Favorites from './pages/Favorites';
import Breeds, { Breed } from './pages/Breeds';

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
          if (route.name === 'Breeds') {
            iconName = 'md-home';
          } else if (route.name === 'Favorites') {
            iconName = 'md-heart';
          } else if (route.name === 'BreedsDescription') {
            iconName = 'information-outline';
          } else {
            iconName = 'md-apps-outline';
          }
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Breeds" component={Breeds} />
      <Tab.Screen name="BreedsDescription" component={BreedsDescription} />
      <Tab.Screen name="Favorites" component={Favorites} />
    </Tab.Navigator>
  );
} 
interface IBreedsContext {
  breeds:Breed[], 
  changeFavorites:(data:Breed[]) => void 
}
export const BreedsContext = React.createContext<IBreedsContext>({
 breeds:[], 
 changeFavorites(): void{} 
});
export default function App() {
  const [breeds, setBreeds] = useState<Array<Breed>>([]);
  const changeFavorites= (data:Breed[]) => { 
    setBreeds(data)

  }   
  useEffect(() => {
    fetch('https://api.thedogapi.com/v1/favourites', {
      headers: {
        'x-api-key':
          'live_WKwBaLUZriMPf0Qme8HLRYBJxJ7NxxC2o2LJRvjHjkPq1zMWPMFpPwykF9UTILYL',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.reverse();
        setBreeds(data);
      });
  }, []);
  return (
    <BreedsContext.Provider value={{ breeds, changeFavorites }}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </BreedsContext.Provider>
  );
}
