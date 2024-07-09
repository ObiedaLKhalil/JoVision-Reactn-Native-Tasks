import React, { useState, useRef } from 'react';
import { View, TextInput, Image, Button, FlatList, Pressable, Alert, StyleSheet } from 'react-native';

const DisplayImage = () => {
  const [textt, setText] = useState('');
  const flatListRef = useRef(null);

  const ChangeText = (newT) => {
    console.log("new text", newT);
    setText(newT);
  };

  const images = [
    { id: 1, source: require('../Resource/1.jpg') },
    { id: 2, source: require('../Resource/2.jpg') },
    { id: 3, source: require('../Resource/3.jpeg') },
    { id: 4, source: require('../Resource/4.jpg') },
    { id: 5, source: require('../Resource/5.jpeg') },
    { id: 6, source: require('../Resource/6.jpg') },
    { id: 7, source: require('../Resource/7.jpg') },
    { id: 8, source: require('../Resource/8.jpg') },
    { id: 9, source: require('../Resource/9.jpg') },
    { id: 10, source: require('../Resource/10.jpg') }
  ];

  const ScrollToIndex = () => {
    const index = parseInt(textt) - 1;
    if (index >= 0 && index < images.length) {
      flatListRef.current.scrollToIndex({ animated: true, index });
    } else {
      console.log("Enter a valid index of the image");
    }
  };

  const showImageIndex = (index) => {
    Alert.alert(`You have selected image: ${index}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.space}></View>
      <TextInput
        style={styles.input}
        placeholder="Enter image index"
        onChangeText={ChangeText}
      />
      <View style={styles.space}></View>
      <Button title="Click to enter the index" onPress={ScrollToIndex} />
      <View style={styles.space}></View>
      <View style={styles.space}></View>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={({ item, index }) => (
          <Pressable onPress={() => showImageIndex(index + 1)}>
            <Image source={item.source} style={styles.image} />
          </Pressable>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={true}
      />
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
  space: {
    width: 20,
    height: 50,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default DisplayImage;