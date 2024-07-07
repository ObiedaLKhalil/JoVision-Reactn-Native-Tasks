import React, { useRef,useImperativeHandle,useState,useEffect,Component,forwardRef} from 'react';
import { StyleSheet,TextInput,Text, View} from 'react-native';

// Child Component
const ChildComponent  =() => {
    
  
  const childRef = useRef();
  const handleClick = () => {
    childRef.current.increment();
};
  
    return 
    <View style={styles.container}>
   
    <Text style={styles.text}>{text}</Text>
    </View>
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 30,
      marginTop: 20,
    }, 
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
  });

export default ChildComponent;