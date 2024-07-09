import React, { useState } from 'react';
import { View, Image, Button,FlatList,Pressable, Alert, StyleSheet } from 'react-native';
const DisplayImage = () => {
      const images = [
    { id: 1, source : require('../Resource/1.jpg')},
    { id: 1, source: require('../Resource/2.jpg')},
    { id: 1, source: require('../Resource/3.jpeg')},
    { id: 1, source: require('../Resource/4.jpg')},
    { id: 1, source: require('../Resource/5.jpeg')},
    { id: 1, source: require('../Resource/6.jpg')},
    { id: 1, source: require('../Resource/7.jpg')},
    { id: 1, source: require('../Resource/8.jpg')},
    { id: 1, source: require('../Resource/9.jpg')},
    { id: 1, source: require('../Resource/10.jpg')}
       
       

      ];
    const showImageIndex = (index) => {
        Alert.alert( `You have selected image: ${index}`);
       
         
    
      };
    
  
      return (
        <View style={styles.container}>
           <View style={styles.space}></View>
          <FlatList
            data={images}
            renderItem={({ item, index }) => (
              <Pressable onPress={() => showImageIndex(index+1)}>
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
    button: {
      backgroundColor: 'green',
      color: 'white',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    space: {
        width: 20, 
        height: 150, 
      },
  
  });
  
  export default DisplayImage;