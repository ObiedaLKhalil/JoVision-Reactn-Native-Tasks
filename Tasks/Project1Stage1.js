import React, { useState, useEffect } from 'react';
import {SafeAreaView,StyleSheet, Button, Image, PermissionsAndroid, Platform, Alert } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
const App = () => {
  const [photo, setPhoto] = useState(null);

  const requestPermissions = async () => {
    try {
      // Request camera permission
      const cameraGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      // Request storage permission
      const storageGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs access to your storage',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      
      if (cameraGranted !== PermissionsAndroid.RESULTS.GRANTED || storageGranted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera or Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const takePhoto = () => {
    if (Platform.OS === 'android') {
      requestPermissions();
    }
    launchCamera({ mediaType: 'photo', saveToPhotos:false }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const photoUri = response.assets[0].uri;
        setPhoto(photoUri);
        Alert.alert(
          'Do you want to save or discard this photo?',
          '',
          [
            { text: 'SAVE IT', onPress: () =>savePhoto(photoUri) }, 
            { text: 'DISCARD IT', onPress: () => deletePhoto(photoUri) },
          ],
          { cancelable: false }
        );
      }
    });
  };  
  const savePhoto = async (photoUri) => {
    try {
      const filePath =  `${RNFS.ExternalStorageDirectoryPath}/Pictures/${Date.now()}.jpg`;
      await RNFS.moveFile(photoUri, filePath);
      console.log('Photo saved to gallery:', filePath);
    } catch (error) {
      console.error('Error saving photo:', error);
    }
    
    takePhoto();
  };
  const requestStoragePermissionToDelete = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'This app needs access to your storage to delete photos.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };
  
  const deletePhoto = async (photoUri) => {
    try {
      const hasPermission = await requestStoragePermissionToDelete();
      if (!hasPermission) {
        console.log('Storage permission denied');
        return;
      }
      const filePath = photoUri.startsWith('file://') ? photoUri.replace('file://', '') : photoUri;
      console.log('Deleting file at path:', filePath);
      const fileExists = await RNFS.exists(filePath);
      if (fileExists) {
        await RNFS.unlink(filePath);
        console.log('File deleted');
      
        setPhoto(null);
      } else {
        console.log('File does not exist');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };
  
  const Screen1 = ({ navigation }) => (
    <SafeAreaView style={styles.container}>
  
        <Button title="Take Photo" onPress={takePhoto} color="orange" />
        {photo && <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />}
      
    </SafeAreaView>
  );
  return (
    <NavigationContainer>
    <Tab.Navigator initialRouteName="Screen1" >
      <Tab.Screen name="Screen1" component={Screen1}   options={{  title: 'Camera', headerTitleAlign: 'center',headerTintColor:"blue" }} />
      </Tab.Navigator>
   </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', // Center text horizontally
  },
});
export default App;




