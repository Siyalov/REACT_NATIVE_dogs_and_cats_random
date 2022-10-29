import React, { useEffect, useState } from 'react';

import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { BreedsContext } from '../../App';
import { Breed } from '../Breeds';

let id = 12;
export interface BreedImage {
  id: string;
  url: string;
  width: number;
  height: number;
}
const getNumber = (max: number, min = 0) =>
  Math.floor(Math.random() * (max - min) + min);

export default function App({ route }: { route: any }) {
  const [breedPhotos, setBreedPhotos] = useState<BreedImage[]>([]);
  const [breed, setBreed] = useState<Breed>({} as any);
  const { changeFavorites } = React.useContext(BreedsContext);
  function appData() {
    fetch(`https://api.thedogapi.com/v1/breeds/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBreed(data);
      });
  }

  useEffect(() => {
    appData();
  }, []);

  useEffect(() => {
    if (route.params?.id) {
      id = route.params.id;
      appData();
    }
  }, [route.params?.id]);

  const otherPhotosFavorite = (id: number) => {
    // const url = 'favourites';
    console.log(id);
    fetch(
      `https://api.thedogapi.com/v1/images/search?breed_id=${id}&limit=50`,
      {
        method: 'GET',
        headers: {
          'x-api-key':
            'live_WKwBaLUZriMPf0Qme8HLRYBJxJ7NxxC2o2LJRvjHjkPq1zMWPMFpPwykF9UTILYL',
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data: Array<BreedImage>) => {
        let cnt = data.length;
        const num = getNumber(cnt);

        const newImage = data[num];
        breed.image = newImage;
        breed.reference_image_id = newImage.id;
        setBreed(breed);  
        console.log(data);
        setBreedPhotos(data)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const saveImageInFavourites = (id: string) => {
    // const url = 'favourites';
    console.log(id);

    fetch('https://api.thedogapi.com/v1/favourites', {
      method: 'POST',
      body: JSON.stringify({ image_id: id }),
      headers: {
        'x-api-key':
          'live_WKwBaLUZriMPf0Qme8HLRYBJxJ7NxxC2o2LJRvjHjkPq1zMWPMFpPwykF9UTILYL',
        'content-type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        fetch('https://api.thedogapi.com/v1/favourites', {
          headers: {
            'x-api-key':
              'live_WKwBaLUZriMPf0Qme8HLRYBJxJ7NxxC2o2LJRvjHjkPq1zMWPMFpPwykF9UTILYL',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            data.reverse();
            changeFavorites(data);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.image, styles.shadow]}>
        <View style={styles.circle} />
        <Image
          style={styles.image}
          source={{
            uri:
              'https://cdn2.thedogapi.com/images/' +
              breed.reference_image_id +
              '.jpg',
          }}
        />
      </View>
      <Text style={styles.header}>{breed.name}</Text>
      <Text style={styles.content}>{breed.bred_for}</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => otherPhotosFavorite(breed.id)}
            style={[styles.button, styles.shadow]}>
            <Text style={styles.buttonText}>Другое фото</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => saveImageInFavourites(breed.reference_image_id)}
            style={[styles.button, styles.shadow, styles.margin]}>
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
    paddingHorizontal: 10,
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
  margin: {
    marginLeft: 10,
  },
});
