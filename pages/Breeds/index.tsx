import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export interface Breed {
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
  reference_image_id: string;
}

export default function App({ navigation }: { navigation: any }) {
  const [breeds, setBreeds] = useState<Array<Breed>>([]);

  useEffect(() => {
    fetch(
      'https://api.thedogapi.com/v1/breeds?breeds_id=Pomeranian&include_breeds=false'
    )
      .then((response) => response.json())
      .then((data) => setBreeds(data));
  }, []);
  //const images = [];
  function onPress(breed: Breed) {
    navigation.navigate('BreedsDescription', { id: breed.id });
  }

  return (
    <ScrollView style={styles.container}>
      {breeds.map((breed) => (
        <TouchableOpacity
          style={[styles.breed, styles.shadow]}
          onPress={() => onPress(breed)}>
          <View style={{ width: '40%', height: '100%' }}>
            <View style={styles.image}>
              <Image style={styles.image} source={{ uri: breed.image.url }} />
            </View>
          </View>
          <View style={{ width: '60%', height: '100%' }}>
            <View style={styles.breedBlock}>
              <Text style={styles.breedName}>{breed.name}</Text>
              <Text style={styles.breedText}>{breed.bred_for}</Text>
            </View>
          </View>
        </TouchableOpacity>
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
    flexDirection: 'row',
    flex: 1,
  },
  breedBlock: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    paddingVertical: 16,
    marginLeft: 6,
  },
  breedName: {
    fontWeight: "bold",
  },
  breedText:{
 fontSize: 12,
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
