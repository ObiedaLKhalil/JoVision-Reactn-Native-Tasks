import React, { useState, useRef } from 'react';
import { View, TextInput, Image, Button, Alert, TouchableOpacity,StyleSheet,Pressable} from 'react-native';
import Video, {VideoRef} from 'react-native-video';

const DisplayVideo = () => {
    
      const [isPlaying, setIsPlaying] = useState(false);
      const [isImageVisible, setIsImageVisible] = useState(true);
     const VideoPlay = () => {
          setIsPlaying(!isPlaying);
          setIsImageVisible(false); 
        };
    const [isBuffering, setIsBuffering] = useState(false);
    const onBuffer = (buffer) => {
        console.log('Buffering', buffer);
        setIsBuffering(buffer.isBuffering);
      };
  return (
    <View style={styles.container}>
          <TouchableOpacity onPress={VideoPlay} >
      <Video
        source={require('../Resource/v1.mp4')} 
        style={styles.video}
   
        onBuffer={onBuffer}
        paused={!isPlaying}
      /></TouchableOpacity>
      {isImageVisible && (
       <TouchableOpacity onPress={VideoPlay} >
        <Image source={require('../Resource/images.jpg')} style={styles.image} />
      </TouchableOpacity>
    )}
    
    </View>
  );
};

var styles = StyleSheet.create({
    video: {
    width: 300,
    height: 200,
  },    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    space: {
      width: 20,
      height: 50,
    },
    imageContainer: {
      position: 'relative',
      margin: 5,
      
    },
    image: {
      width: 298,
    height: 170,
      position: 'absolute',bottom:15,left:-149,
      },
  
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
  });
  
export default DisplayVideo;