import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
ScrollView,
} from 'react-native';
import { Breed } from '../Breeds';

export default function App() {
  const [breeds, setBreeds] = useState<Array<Breed>>([]);
  useEffect(() => {
    fetch('https://api.thedogapi.com/v1/favourites', {
      headers: {
        'x-api-key':
          'live_WKwBaLUZriMPf0Qme8HLRYBJxJ7NxxC2o2LJRvjHjkPq1zMWPMFpPwykF9UTILYL',
      },
    })
      .then((response) => response.json())
      .then((data) => {data.reverse(); setBreeds(data)});
  }, []);
  //const images = [];

  // const images = [
  //   require('../../dogPNG503671.png'),
  //   require('../../dogPNG503671.png'),
  // ];

  return (
    <ScrollView style={styles.container}>
      {breeds.map((breed) => (
        <View style={[styles.image, styles.shadow]}>
          <View style={styles.circle} />
          <Image style={styles.image} source={{ uri: breed.image.url }} />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 'auto',
    aspectRatio: 1,
    borderRadius: 16,
    marginBottom:12,
  },
  container: {
    backgroundColor: '#FFF8F8',
    flex: 1,
    padding: 42,
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
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
});
