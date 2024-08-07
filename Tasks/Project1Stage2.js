import React, { useState, useEffect, useRef } from 'react';
import {SafeAreaView,StyleSheet,TextInput,View,Text, Button, Image,Modal,ImageBackground, PermissionsAndroid, Platform, Alert,StatusBar,ScrollView,FlatList,RefreshControl,TouchableOpacity,Pressable} from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab =createBottomTabNavigator();
import Geolocation from 'react-native-geolocation-service';
import { accelerometer, setUpdateIntervalForType, SensorTypes, orientation } from 'react-native-sensors';
import { map, filter } from 'rxjs/operators';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
const App = () => {
    const [cameraType, setCameraType] = useState('front');
    const [cameraMode, setCameraMode] = useState('camera');
    const [photo, setPhoto] = useState(null);
    const [location, setLocation] = useState(null);
    const [orientation, setOrientation] = useState({ x: 0, y: 0, z: 0 });
    const [selectedImage, setSelectedImage]=useState(require(  '../Resource/sittingPerson.png'));
    const [rotation, setRotation] = useState(0);
    const [loadedPhotos, setLoadedPhotos] = useState([]);
    const [loadedVideos, setLoadedVideos] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    //const [isPlaying, setIsPlaying] = useState(true);
    const [loadPhotosVideos,setloadPhotosVideos] = useState([]);
    const [newName,setNewName]=useState("");
    const [visible,setVisible]=useState(false);
    const [submit,setsubmit]=useState(false);
    const[passItem,setpassItem]=useState(null);
    const[ispassItem,setispassItem]=useState(false);
    const[isnagivate,setisnagivate]=useState(false);
    const[isVideo,setIsVideo]=useState(false);
    const [isBuffering, setIsBuffering] = useState(false);
    const [paused, setPaused] = useState(false);
    const flatListRef1=useRef(null);
    //const [playbackPosition, setPlaybackPosition] = useState(0);
   // const [seekPosition, setSeekPosition] = useState(null); // New state for seeking
   // const flatListRef2=useRef(null);
    const playerRef = useRef(null);
   const [pausedTime,setPausedTime]=useState();

    const X =5;
    const Y =3;
    const images = {
      1: require('../Resource/car.jpg'),
      2: require('../Resource/personWalking.jpg'),
      3: require('../Resource/sittingPerson.png')
    };
const requestStoragePermissionToRename = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs access to your storage to rename files.',
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
  return true; // For iOS or other platforms
};
  const requestCameraPermissions =async  () => {
    if (Platform.OS === 'android') {
    try {
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
      if (cameraGranted === PermissionsAndroid.RESULTS.GRANTED && storageGranted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera and  Storage permission granted');
        return true;
      }
      else {
        console.log(' Camera or  Storage permission  denied');
        return false;}
    } catch (error) {
      console.warn(error);
      return false;
    }
  }
  return true;
};
  const requestStoragePermissionToDelete =async  () => {
    if (Platform.OS === 'android') {
      try {
        const storageGranted =await  PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'This app needs access to your storage to delete photos.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (storageGranted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Storage permission granted');
            return true;
          }
          else {
            console.log(' Storage permission  denied');
            return false;}
         
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };
   const requestMicrophonePermission= async()=> {
    if (Platform.OS === 'android') {
    try {
      const microphoneGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'This app needs access to your microphone',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (microphoneGranted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the microphone');
        return true;
      } else {
        console.log('Microphone permission denied');
        return false;
      }
    } catch (error) {
      console.warn(error);
      return false;
    }
  }
    return true;
  };
  const requestLocationPermission =async  () => {
    if (Platform.OS === 'android') {
      try {
        const locationPermission =await  PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location for [purpose]',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (locationPermission === PermissionsAndroid.RESULTS.GRANTED) {
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
  const toggleCameraType = () => {
    setCameraType(prevType => (prevType === 'back' ? 'front' : 'back'));
  };
  const toggleCameraMode = () => {
    setCameraMode(prevType => (prevType === 'camera' ? 'video' : 'camera'));
  };
  const TakePhotoOrRecordVideo = () => {
   const cameraPermission =  requestCameraPermissions();
      if (!cameraPermission) {
        console.log('camera and storage permission denied');
        return;
      }
      if(cameraMode==='camera'){
    launchCamera({ mediaType: 'photo', saveToPhotos:false, cameraType: cameraType,  }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      }
       else {
        const photoUri = response.assets[0].uri;
        setPhoto(photoUri);
        Alert.alert(
          'Do you want to save or discard this photo?',
          '',
          [
            { text: 'SAVE IT', onPress: () =>savePhoto(photoUri) }, 
            { text: 'DISCARD IT', onPress: () => deletePhotoOrVideo(photoUri) },
          ],
          { cancelable: false }
        );
      }
    });
}
else{ 
  requestMicrophonePermission();
    launchCamera({ mediaType: 'video', saveToPhotos:false, cameraType: cameraType,  }, (response) => {
        if (response.didCancel) {
          console.log('User cancelled  video recording ');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        }
         else {
          const photoUri = response.assets[0].uri;
          setPhoto(photoUri);
          Alert.alert(
            'Do you want to save or discard this video?',
            '',
            [
              { text: 'SAVE IT', onPress: () =>savePhoto(photoUri) }, 
              { text: 'DISCARD IT', onPress: () => deletePhotoOrVideo(photoUri) },
            ],
            { cancelable: false }
          );
        }
  
      });
}
  };
  const deletePhotoOrVideo =  (photoUri) => {
    try {
      const storagePermission =  requestStoragePermissionToDelete();
      if (!storagePermission) {
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
        loadPhotosVideosFun();
      } else {
        console.log('File does not exist');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };
  const deleteFun =  (item) => {
    try {
      const storagePermission =  requestStoragePermissionToDelete();
      if (!storagePermission) {
        console.log('Storage permission denied');
        return;
      }
      const filePath = item.path;
      console.log('Deleting file at path:', filePath);
      const fileExists =  RNFS.exists(filePath);
      if (fileExists) {
         RNFS.unlink(filePath);
        console.log('File deleted');
        loadPhotosVideosFun();
      } else {
        console.log('File does not exist');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };
  const savePhoto =  (photoUri) => {
    RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/Media`);
    if(cameraMode=="camera"){
    try {
      const filePath =  `${RNFS.DocumentDirectoryPath}/Media/Obieda_${Date.now()}.jpg`;
       RNFS.moveFile(photoUri, filePath);
      console.log('Photo saved :', filePath);
    } catch (error) {
      console.error('Error saving photo:', error);
    }}
    else{
      try {
        const filePath =  `${RNFS.DocumentDirectoryPath}/Media/Obieda_${Date.now()}.mp4`;
         RNFS.moveFile(photoUri, filePath);
        console.log('video saved:', filePath);
      } catch (error) {
        console.error('Error saving photo:', error);
      }
    }
    
    TakePhotoOrRecordVideo();
  };
  const loadPhotosFunction = async () => {
    const loadedPermission =  requestStoragePermissionToLoad();
        if (!loadedPermission) {
          console.log('Storage permission denied');
          return;
        }
        
    try {
      const files = await RNFS.readDir(RNFS.DocumentDirectoryPath + '/Pictures');
      const imageFiles = files.filter(file => file.isFile() && /\.(jpe?g|png)$/i.test(file.name));
      setLoadedPhotos(imageFiles);
    } catch (error) {
      console.error(error);}};
      const loadVideosFunction = async () => {
        const loadedPermission =  requestStoragePermissionToLoad();
            if (!loadedPermission) {
              console.log('Storage permission denied');
              return;
            }
            
        try {
          const files = await RNFS.readDir(RNFS.DocumentDirectoryPath + '/Movies');
          const videoFiles = files.filter(file => file.isFile() && /\.mp4$/i.test(file.name));
          setLoadedVideos(videoFiles);
        } catch (error) {
          console.error(error);}};
     const loadPhotosVideosFun =async()=>{
      const loadedPermission =  requestStoragePermissionToLoad();
  if (!loadedPermission) {
    console.log('Storage permission denied');
    return;
  }
  if (!RNFS.exists(`RNFS.DocumentDirectoryPath}/Media`)) {
    RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/Media`);
    }
  try {
   
    const files1 = await RNFS.readDir(RNFS.DocumentDirectoryPath + '/Media');
    const videosPhotosFiles = files1.filter(file => file.isFile() && /\.(jpe?g|png|mp4)$/i.test(file.name));
    setloadPhotosVideos(videosPhotosFiles);

  } catch (error) {
    console.error(error);}};
    const handlePress =(item)=>{
      Alert.alert(
        'this item is pressed so Choose one of these options',
        'Rename,Delete,FullScreen',
        [
          { text: 'Rename', onPress: () =>RenameFun(item) },
          { text: 'Delete', onPress: () =>deleteFun(item) },
          { text: 'FullScreen', onPress: () =>FullScreenFun(item) },
        ],
        { cancelable: false }
      );
    };
const RenameFun =async (item)=>{
  setVisible(true);
  const storagePermission = await requestStoragePermissionToRename();
  if (!storagePermission) {
    console.log('Storage permission denied');
    return;
  }
  try {

 const newPath = `${RNFS.DocumentDirectoryPath}/Media/${newName}`;
 if(submit){
  setVisible(false);
    await RNFS.moveFile(item.path, newPath);
    console.log('File renamed successfully');
    console.log(newPath);
    setsubmit(false);
   

 }
    
  } catch (error) {
    console.error('Error renaming file:', error);
  }
};
const submitFunction =()=>{

setsubmit(true);

};

const FullScreenFun = (item)=>{
  setisnagivate(true);
  setisnagivate(false);
  setpassItem(item); 
 setispassItem(true);
};
      const onRefresh1 = React.useCallback(() => {
            setRefreshing(true);
            loadPhotosVideosFun().then(() => setTimeout(() => {
              setRefreshing(false);
          }, 5000));
           
        }, []);
    
  const ChangeText = (newT) => {
    setNewName(newT);
  };
   
/*const handlePause =  () => {
    if (playerRef.current) {
      try {
        const position =  playerRef.current.getCurrentTime;
        console.log(position);
        setPlaybackPosition(position);
        setPaused(true);
      } catch (error) {
        console.error("Error getting current time:", error);
      }
    }
  };
  const handlePlay = () => {
    setPaused(false);
    if (playerRef.current) {
      try {
        playerRef.current.seek(playbackPosition);
      } catch (error) {
        console.error("Error seeking to playback position:", error);
      }
    }};*/
  /*const VideoPlay = () => {
    //if(isPlaying){
   //   handlePause();
   // }
   // else{
   //   handlePlay();
  //  }
    setPaused(!paused);

  };
*/



  const handlePause = () => {
    // Store playback position from onProgress
    setPaused(true);
   
   // setPausedTime(playerRef.current.getCurrentPosition);
   // console.log(pausedTime);
   // setSeekPosition(playbackPosition);
   playerRef.current.getCurrentPosition().then(position => {
    setPausedTime(position);
    console.log(pausedTime); // Logging the position
  }).catch(error => {
    console.error('Error getting current position:', error);
  });
  };

  // Handles play action and seeks to the stored playback position
  const handlePlay = () => {
    setPaused(false);
    console.log('Paused Time:', pausedTime);
      playerRef.current.seek(pausedTime);
    //  setPausedTime(0); // Clear seek position after using it
    
  };
  const handleForward5 = () => {
    playerRef.current.seek(playerRef.current.currentTime+5);
  };
const handleRewind5= () => {
  playerRef.current.seek(playerRef.current.currentTime-5);
};

  // Update playback position while video is playing
  /*const handleProgress = ({ currentTime }) => {
    if (!paused) {
      setPlaybackPosition(currentTime);
    }
  };
*/









  const onBuffer = (buffer) => {
    console.log('Buffering', buffer);
    setIsBuffering(buffer.isBuffering);
  };
const Screen1 = ({ navigation }) => (
  <SafeAreaView style={styles.container}>

  <Button title="Switch camera" onPress={toggleCameraType} color="orange" />
  <Button title="Switch mode" onPress={toggleCameraMode} color="red" />
  <Button title="Take photo/ Record video" onPress={TakePhotoOrRecordVideo} color="green" />
  {photo && <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />}
</SafeAreaView>
);
const Screen2 = ({ navigation }) => {

  useEffect(()  => {
    const getLocation=()=>{
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
    );};
    getLocation();
    const locationInterval = setInterval(getLocation, 10000);
    return () => {
      clearInterval(locationInterval);
     
    };
  }, [location]);
    useEffect(()  => {

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
           
            accelerometerSubscription.unsubscribe();
          };
        }, [orientation]);
        useEffect(() => {
          if (orientation.x === 0 && orientation.y > 0 && orientation.z === 0) {
            setRotation(0);
          } else if (orientation.x > 0 && orientation.y === 0 && orientation.z === 0) {
            setRotation(270);
          } else if (orientation.x === 0 && orientation.y < 0 && orientation.z === 0) {
            setRotation(180);
          } else if (orientation.x < 0 && orientation.y === 0 && orientation.z === 0) {
            setRotation(90);
          }
        }, [orientation]);
        useEffect(() => {
          if(location !== null){
            if(location.coords.speed>X){
              setSelectedImage(images[1]);}
              if(location.coords.speed>Y && location.coords.speed<X){
                setSelectedImage(images[2]);}
                if(location.coords.speed<Y){
                  setSelectedImage(images[3]);}
                }
          
        }, [location]);
      
return(
<SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>
    {  location && <View>
  <Text>X: {X}</Text>
  <Text>Y: {Y}</Text>
  <Text>Speed: {location.coords.speed}</Text>
  <Image source={selectedImage} style={styles.image} />
  </View>
  }

  <Text>X: {orientation.x}</Text>
  <Text>Y: {orientation.y}</Text>
  <Text>Z: {orientation.z}</Text>
  <Image source={require('../Resource/6.jpg')}     style={[styles.image, { transform: [{ rotate: `${rotation}deg` }] } ]} />

  </ScrollView>
</SafeAreaView>
);};
const Screen3 = ({ navigation }) => {
  useEffect(() => {
    if(isnagivate)
    navigation.navigate('Screen4');
  }, []);
return(
  <SafeAreaView style={styles.container}>
    <Text style={{ color: "purple",fontWeight:"bold" }}>Refresh the page</Text>
    <Text style={styles.text2}>IMAGE HAS GREEN COLOR ICON</Text>
    <Text style={styles.text1}> VIDEO HAS RED COLOR ICON</Text>
    <FlatList
ref={flatListRef1}
data={loadPhotosVideos}
style={{ textAlign: 'center',  padding: 20,}}
renderItem={({ item }) => {
const isVideo = item.name.endsWith('.mp4');

return (
<TouchableOpacity onPress={() => handlePress(item)}>
  <ImageBackground source={{ uri: 'file://' + item.path }} style={styles.image}>
    <View>
   
      <Icon name={'camera'} size={20} color={isVideo ? 'red' : 'green'} />
      
    </View>
  </ImageBackground>
 </TouchableOpacity>
);
}}
horizontal={true}
showsHorizontalScrollIndicator={true}
refreshControl={
<RefreshControl refreshing={refreshing} onRefresh={onRefresh1} />
}
/>
{visible &&
<TextInput
    style={styles.input}
    onChangeText={(newT)=>ChangeText(newT)}
    onSubmitEditing={submitFunction}
    autoFocus={true}
    value={newName}
  />
}
 
</SafeAreaView>
);};
const Screen4 = ({ navigation }) =>{
  useEffect(() => {
    if(passItem)
      if(passItem.path.split('.').pop()==="mp4"){setIsVideo(true);}
   
  }, []);
  

return (
  <SafeAreaView style={styles.container}>

{ispassItem  ? (
  isVideo ? (
    <View>
    <Video
    source={{ uri: 'file://' + passItem.path}}
   // source={require('../Resource/v1.mp4')} 
    style={styles.video}

    onBuffer={({ isBuffering }) => {
      console.log('Buffering', { isBuffering });
    }}
   // paused={!isPlaying}
    controls
    ref={playerRef}
    paused={paused}
    //onProgress={handleProgress}

  />


    <View style={ {justifyContent: 'center',
      alignItems: 'center',
      padding: 10}}>
    <Button 
  title={paused ? 'Play' : 'Pause'} 
  onPress={async () => {
    if (paused) {
      try {
        await setPaused(false);
        await playerRef.current.seek(pausedTime);
        console.log('Play function Paused Time:', pausedTime);
      } catch (error) {
        console.error('Error seeking to paused time:', error);
      }
    } else {
      try {
        const position = await playerRef.current.getCurrentPosition();
        await setPaused(true);
        await setPausedTime(position);
        console.log('Paused Time:', position); // Logging the position
      } catch (error) {
        console.error('Error getting current position:', error);
      }
    }
  }}
/>
</View>


<View style={styles.button}>
<Button 
  title="forward 5 second "
  onPress={async () => {
      try {
        const position = await playerRef.current.getCurrentPosition();
        await playerRef.current.seek(position+5);
        console.log('Paused Time:', position+5); // Logging the position
      } catch (error) {
        console.error('Error getting current position:', error);
      }
    }
  }
/>

<Button 
  title="rewind 5 second "
  onPress={async () => {
      try {
        const position = await playerRef.current.getCurrentPosition();
        await playerRef.current.seek(position-5);
        console.log('Paused Time:', position-5); // Logging the position
      } catch (error) {
        console.error('Error getting current position:', error);
      }
    }
  }
/>
</View>
   
      </View>

  ):( <Image source={{ uri: 'file://' + passItem.path}} style={styles.image2} />)

 
) : (
  <Text>No media selected</Text>
)}
 <View style={styles.button}>
 <Button
      title="Previous"
      onPress={() => navigation.navigate('Screen4')}
      color="orange"
     />
     <Button
      title="Next"
      onPress={() => navigation.navigate('Screen4')}
      color="red"
      />
   </View>
</SafeAreaView>

);};
    return(
        <NavigationContainer>
<Tab.Navigator initialRouteName='Screen1' screenOptions={{unmountOnBlur:true}} >
      <Tab.Screen name="Screen1" component={Screen1}   options={{  title: 'Camera', headerTitleAlign: 'center',headerTintColor:"blue" }} />
      <Tab.Screen name="Screen2" component={Screen2}   options={{  title: 'sensors', headerTitleAlign: 'center',headerTintColor:"blue" }} />
      <Tab.Screen name="Screen3" component={Screen3}   options={{  title: 'gallery', headerTitleAlign: 'center',headerTintColor:"blue" }} />
      <Tab.Screen name="Screen4" component={Screen4}   options={{  title: 'Media viewer', headerTitleAlign: 'center',headerTintColor:"blue", tabBarButton: () => null }} />
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
      width: 40,
      height: 40,
      marginBottom: 10,
      marginTop:30,
    },
    image2: {
      width: 200,
      height: 200,
      marginBottom: 10,
      marginTop:30,
    },
    screen2style: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      paddingTop: StatusBar.currentHeight,
      paddingBottom :StatusBar.currentHeight,
    },
    text1: {
      fontSize: 10,
      marginTop: 10,
      color:"red",
      fontWeight:'bold',
    },
    text2: {
      fontSize: 10,
      marginTop: 10,
      color:"green",
      fontWeight:'bold',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 5,
      borderColor:'red',
      padding: 10,
      color:"purple",
      fontWeight:"bold",
    },
    button:{  
      flexDirection: 'row', // Arrange children in a row
      padding: 10, // Optional: Add padding around the container
     
      },
      video: {
        width: 300,
        height: 200,
       
      }, 
  });
export default App;



