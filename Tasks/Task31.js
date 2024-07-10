import React, { useState, useRef } from 'react';
import { View, TextInput, Image, Button, FlatList, Pressable, Alert, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DisplayImage = () => {
  const [textt, setText] = useState('');
  const [images, setImages] = useState([
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
  ]);

  const flatListRef = useRef(null);

  const ChangeText = (newT) => {
    console.log("new text", newT);
    setText(newT);
  };

  const ScrollToIndex = () => {
    const index = parseInt(textt) - 1;
    if (index >= 0 && index < images.length) {
      flatListRef.current.scrollToIndex({ animated: true, index });
    } else {
      console.log("Enter a valid index of the image");
    }
  };

  const removeImage = (index) => {
    setImages(images.filter(image => image.id !== index));
  };

  const confirmDelete = (index) => {
    Alert.alert(
      'remove Image from the list',
      'Are you sure you want to remove this image from the list?',
      [
        { text: 'Cancle', onPress: () => {}, style: 'cancel' },
        { text: 'OK', onPress: () => removeImage(index) }
      ],
      { cancelable: false }
    );
  };
  const repeatImage = (index) => {
    setImages([ ...images.slice(0, index + 1),images[index], ...images.slice(index + 1)]);
  };
 const confirmRepeat = (index) => {
    Alert.alert(
        'Repeat Image',
        'Are you sure you want to repeat this image and adding it to the right of the original image?',
        [
          { text: 'Cancle', onPress: () => {}, style: 'cancel' },
          { text: 'OK', onPress: () => repeatImage(index) }
        ],
        { cancelable: false }
      );
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
        value={textt}
      />
      <View style={styles.space}></View>
      <Button title="Click to enter the index" onPress={ScrollToIndex} />
      <View style={styles.space}></View>
      <View style={styles.space}></View>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={({ item, index }) => ( 
            
        <View style={styles.imageContainer}>
            <Pressable onPress={() => showImageIndex(index + 1)}>
       <Image source={item.source} style={styles.image} />
     </Pressable>
     <Pressable style={styles.iconContainer1} onPress={() => confirmDelete(item.id)}>
        <Icon  name="delete" size={50} color="red" /> 
        </Pressable>
        <Pressable style={styles.iconContainer2} onPress={() => confirmRepeat(item.id-1)}>
        <Icon  name="repeat" size={50} color="green" /> 
        </Pressable>

         </View>
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
  imageContainer: {
    position: 'relative',
    margin: 5,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
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
  iconContainer1: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  iconContainer2: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
});

export default DisplayImage;