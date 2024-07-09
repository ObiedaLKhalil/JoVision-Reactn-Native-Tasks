import React, { useState } from 'react';
import { View, Image, Button, Alert, StyleSheet } from 'react-native';

const DisplayImage = () => {
  const [selectedImage, setSelectedImage] = useState(require(  '../Resource/1_3knApxFPqQwjvWEt1BDKjw.jpg'));




  const images = {
    1: require('../Resource/1.jpg'),
    2: require('../Resource/2.jpg'),
    3: require('../Resource/3.jpeg')
  };

  const showImagePicker = () => {
    Alert.alert(
      'Pick an Image',
      'Choose an image number from the list { 1 , 2 ,  3 }',
      [
        { text: '1', onPress: () => setSelectedImage(images[1]) },
        { text: '2', onPress: () => setSelectedImage(images[2]) },
        { text: '3', onPress: () => setSelectedImage(images[3]) },
        { text: 'E', onPress: () => {}, style: 'cancel' },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Image source={selectedImage} style={styles.image} />
      <Button  title="Pick Image" onPress={showImagePicker} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'green',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },

});

export default DisplayImage;