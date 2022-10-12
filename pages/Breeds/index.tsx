import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import axios from 'axios';

const SKREEN_WIDTH = Dimensions.get('window').width;

interface Breed {
  id: number;
  name: string;
  bred_for: string;
  temperament: string;
  image: {
    id: string;
    width: number;
    height: number;
    url: string;
  };
}

export default function App() {
  const [breeds, setBreeds] = useState<Array<Breed>>([]);

  axios.get('https://api.thedogapi.com/v1/breeds', ).then((res)=> {
    const data: Array<Breed> = res.data;
    setBreeds(data)
  })

  const images = [
    require('../../dogPNG503671.png'),
    require('../../dogPNG503671.png'),
    require('../../dogPNG503671.png'),
  ];
  return (
    <ScrollView style={styles.container}>
      {images.map((image) => (
        <View style={[styles.breed, styles.shadow]}>
          <View style={{ width: '40%', height: '100%' }}>
            <View style={styles.image}>
              <Image style={styles.image} source={image} />
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: 'auto',
    aspectRatio: 1,
    borderRadius: 16,
    resizeMode: 'stretch',
  },
  container: {
    backgroundColor: '#FFF8F8',
    flex: 1,
    padding: 24,
  },
  breed: {
    height: 130,
    marginBottom: 10,
    borderRadius: 16,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
});
