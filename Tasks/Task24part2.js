import React, { useRef,useImperativeHandle,useState,useEffect,Component,forwardRef} from 'react';
import { StyleSheet,TextInput,Text, View} from 'react-native';
import Task24part1 from './Task24part1';
 // Parent Component
  const ParentComponent = forwardRef((props, ref) => {
    const [textt, onChangeText] = React.useState('enter your text ');
  
    return (
      
      <>
         <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={textt}
        />
        <Text style={styles.text}>{textt}</Text>
        </View>
    
      </>
    );
  });
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
  
