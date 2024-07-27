import React, { useState, useEffect,useRef } from 'react';
import {SafeAreaView,StyleSheet, Button, Image, PermissionsAndroid, Platform, Alert,View,Text,RefreshControl,FlatList,TouchableOpacity} from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Geolocation from 'react-native-geolocation-service';
import { accelerometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import { map, filter } from 'rxjs/operators';



const Tab = createBottomTabNavigator();
const App = () => {
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [orientation, setOrientation] = useState({ x: 0, y: 0, z: 0 });
  const [refreshing, setRefreshing] = React.useState(false);
  const [loadedPhotos, setLoadedPhotos] = useState([]);
  const [loadedPhotos1, setLoadedPhotos1] = useState([]);
  const flatListRef1 = useRef(null);
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef(null);

  const requestPermissions =async  () => {
    try {
      // Request camera permission
      const cameraGranted =  await PermissionsAndroid.request(
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
  const savePhoto =  (photoUri) => {
    try {
      
      const filePath =  `${RNFS.ExternalStorageDirectoryPath}/Pictures/${Date.now()}.jpg`;
       RNFS.moveFile(photoUri, filePath);
      console.log('Photo saved to gallery:', filePath);
    } catch (error) {
      console.error('Error saving photo:', error);
    }
    
    takePhoto();
  };
  const requestStoragePermissionToDelete =async  () => {
    if (Platform.OS === 'android') {
      try {
        const granted =await  PermissionsAndroid.request(
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
  
  const deletePhoto =  (photoUri) => {
    try {
      const hasPermission =  requestStoragePermissionToDelete();
      if (!hasPermission) {
        console.log('Storage permission denied');
        return;
      }
      const filePath = photoUri.startsWith('file://') ? photoUri.replace('file://', '') : photoUri;
      console.log('Deleting file at path:', filePath);
      const fileExists =  RNFS.exists(filePath);
      if (fileExists) {
         RNFS.unlink(filePath);
        console.log('File deleted');
      
        setPhoto(null);
      } else {
        console.log('File does not exist');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };
  const requestLocationPermission =async  () => {
    if (Platform.OS === 'android') {
      try {
        const granted =await  PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location for [purpose]',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the location');
          return true;
        } else {
          console.log('Location permission denied');
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // For iOS or other platforms, return true by default
  };

  const requestStoragePermissionToLoad =async ()=>{
    if (Platform.OS === 'android') {
      try {
        const granted =await  PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Storage Permission',
          message: 'This app needs access to your storage',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can access to the storage');
          return true;
        } else {
          console.log('storage permission denied');
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // For iOS or other platforms, return true by defaul
  };
  const loadPhotosFunction = async () => {
    const loadedPermission =  requestStoragePermissionToLoad();
        if (!loadedPermission) {
          console.log('Storage permission denied');
          return;
        }
        
    try {
      const files = await RNFS.readDir(RNFS.ExternalStorageDirectoryPath + '/Pictures');
      const imageFiles = files.filter(file => file.isFile() && /\.(jpe?g|png)$/i.test(file.name));
      setLoadedPhotos(imageFiles);
    } catch (error) {
      console.error(error);}};

      const loadPhotosFunction1 = async () => {
        const loadedPermission =  requestStoragePermissionToLoad();
            if (!loadedPermission) {
              console.log('Storage permission denied');
              return;
            }
            
        try {
          const files = await RNFS.readDir(RNFS.ExternalStorageDirectoryPath + '/Pictures');
          const imageFiles = files.filter(file => file.isFile() && /\.(jpe?g|png)$/i.test(file.name));
          setLoadedPhotos1(imageFiles);
        } catch (error) {
          console.error(error);}};
    
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadPhotosFunction().then(() => setTimeout(() => {
      setRefreshing(false);
  }, 1000));
   
}, []);

const startSlideshow = () => {
  if (loadedPhotos1.length === 0) return; // Ensure there are photos to display
  intervalRef.current = setInterval(() => {
    setCurrentIndex(currentIndex => {
      const nextIndex = (currentIndex + 1) % loadedPhotos1.length;
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ index: nextIndex });
      }
      return nextIndex;
    });
  }, 1000); // Scroll every second
};
const stopSlideshow = () => {
  if (intervalRef.current) {
    clearInterval(intervalRef.current);
  }
};
 const togglePlayPause = () => {
  loadPhotosFunction1();
        setIsPlaying(!isPlaying);};
  const Screen1 = ({ navigation }) => (
    <SafeAreaView style={styles.container}>
  
        <Button title="Take Photo" onPress={takePhoto} color="orange" />
        {photo && <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />}
      
    </SafeAreaView>
  );
   const Screen2 = ({ navigation }) => {
    useEffect(()  => {
     
    
      // Request location permission and get location updates
      const getLocation = () => {
        const locationPermission =  requestLocationPermission();
        if (!locationPermission) {
          console.log('location permission denied');
          return;
        }
        Geolocation.getCurrentPosition(
          (position) => {
            setLocation(position);
          },
          (error) => {
            console.error(error);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      };
  
      // Get initial location
      getLocation();
  
      // Set interval for location updates
      const locationInterval = setInterval(getLocation, 10000);
  
      // Set update interval for orientation
      setUpdateIntervalForType(SensorTypes.accelerometer, 500);
      const accelerometerSubscription = accelerometer
      .pipe(
        map(({ x, y, z }) => ({ x, y, z })),
        filter(({ x, y, z }) => x !== null && y !== null && z !== null)
      )
      .subscribe(
        (orientationData) => {
          setOrientation(orientationData);
        },
        (error) => {
          console.error(error);
        }
      );
            return () => {
              
              clearInterval(locationInterval);
              accelerometerSubscription.unsubscribe();
              
            };
          }, []);
          
  
return(
    <SafeAreaView style={styles.container}>
    {  location && <View>
      <Text>Latitude: {location.coords.latitude}</Text>
      <Text>Longitude: {location.coords.longitude}</Text>
      <Text>Altitude: {location.coords.altitude}</Text>
      <Text>Speed: {location.coords.speed}</Text>
      </View>
      }
       <Text>X: {orientation.x}</Text>
      <Text>Y: {orientation.y}</Text>
      <Text>Z: {orientation.z}</Text>
    </SafeAreaView>
  );};
  const Screen3 = ({ navigation }) => {
    useEffect(()  => {
      loadPhotosFunction();
  }, []);
    return(
      <SafeAreaView style={styles.container}>
      <FlatList
          ref={flatListRef}
          data={loadedPhotos}
          renderItem={({ item }) => (
              <Image   source={{ uri: 'file://' + item.path }} style={styles.image} />
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
      />
  </SafeAreaView>
  );};
  const Screen4= ({ navigation }) => {
    useEffect(() => {
     
      let timer;
      if (isPlaying &&  loadedPhotos1.length > 0) {
          timer = setInterval(() => {
              setCurrentIndex((prevIndex) => (prevIndex + 1) % loadedPhotos1.length);
          }, 1000);
      } 
      return () => {
          if (timer) clearInterval(timer);
      };
  }, [isPlaying, loadedPhotos1.length]);

   useEffect(() => {
    if (flatListRef1.current) {
      flatListRef1.current.scrollToIndex({ index: currentIndex, animated: true });
    }
  }, [currentIndex]);

  const onScrollToIndexFailed = (info) => {
    const wait = new Promise(resolve => setTimeout(resolve, 500));
    wait.then(() => {
      flatListRef1.current?.scrollToIndex({ index: info.index, animated: true });
    });
  };
    return(
      <SafeAreaView style={styles.container}>
   <Text >Slideshow</Text>
   <Button title={isPlaying ? 'Pause' : 'Resume'} onPress={togglePlayPause} color="orange" />
   
      <TouchableOpacity onPress={togglePlayPause} >
      {loadedPhotos1.length > 0 ? (
      <FlatList
        data={loadedPhotos1}
        renderItem={({ item }) => (
          <Image   source={{ uri: 'file://' + item.path }} style={styles.image} />
      )}
        horizontal
       pagingEnabled
        onScrollToIndexFailed={onScrollToIndexFailed}
       scrollEnabled={false}
        ref={flatListRef1}
      />
    ) : (
      <Text>No images available</Text>
  )}
      </TouchableOpacity>
  </SafeAreaView>
  );};

  return (
    <NavigationContainer>
    <Tab.Navigator initialRouteName="Screen1" screenOptions={{unmountOnBlur:true}} >
      <Tab.Screen name="Screen1" component={Screen1}   options={{  title: 'Camera', headerTitleAlign: 'center',headerTintColor:"blue" }} />
      <Tab.Screen name="Screen2" component={Screen2}   options={{  title: 'sensors', headerTitleAlign: 'center',headerTintColor:"blue" }} />
      <Tab.Screen name="Screen3" component={Screen3}   options={{  title: 'gallery', headerTitleAlign: 'center',headerTintColor:"blue" }} />
      <Tab.Screen name="Screen4" component={Screen4}   options={{  title: 'slideshow', headerTitleAlign: 'center',headerTintColor:"blue" }} />
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
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
});
export default App;
