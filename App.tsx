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
  return (
    <View style={styles.container}>
      <View style={[styles.image, styles.shadow]}>
        <View style={styles.circle} />
        <Image style={styles.image} source={require('./dogPNG503671.png')} />
      </View>
      <Text style={styles.header}>Pomeranian</Text>
      <Text style={styles.content}>
        Taking care of a pet is my favorite, it helps me to...
      </Text>
      <View style={styles.buttonContainer}>
        <View style={styles.buttons}>
          <TouchableOpacity style={[styles.button, styles.shadow]}>
            <Text style={styles.buttonText}>Другое фото</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.shadow, styles.margin]}>
            <Text style={styles.buttonText}>Добавить в избранное</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  header: {
    marginTop: 42,
    fontWeight: 'bold',
    color: '#333333',
    fontSize: 20,
  },
  content: {
    color: '#4F4F4F',
    fontSize: 14,
    marginTop: 32,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingHorizontal:10,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: 'white',
    marginTop: 43,
  },
  buttonText: {
    color: '#5533EA',
    fontSize: 14,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  margin:{
    marginLeft:10,
  },
});
