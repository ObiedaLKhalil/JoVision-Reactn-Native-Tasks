import React, { useRef,useImperativeHandle,useState,useEffect,Component,forwardRef} from 'react';
import { StyleSheet,TextInput,Text, View} from 'react-native';
import Task24part1 from './Task24part1';
import ChildComponent from './Task24part1';
 // Parent Component
  const ParentComponent = ()=>{
    
    const childRef = useRef();
   
    return (
      
      
         <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={childRef.current?.ChangeText}
         // value={childRef.current ? childRef.current?.ChangeText : ''}
        />
          <ChildComponent ref={childRef} /> 
        </View>
    
      
    );
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

  export default ParentComponent;
  
