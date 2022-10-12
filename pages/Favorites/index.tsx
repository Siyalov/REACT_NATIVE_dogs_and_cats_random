import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const SKREEN_WIDTH = Dimensions.get('window').width;

export default function App() {
  const images = [require('../../dogPNG503671.png'),require( '../../dogPNG503671.png')];
  return (
    <View style={styles.container}>
      {images.map((image) => (
        <View style={[styles.image, styles.shadow]}>
          <View style={styles.circle} />
          <Image style={styles.image} source={image} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 'auto',
    aspectRatio: 1,
    borderRadius: 16,
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
