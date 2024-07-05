import React, { useState,useEffect } from 'react';
import { StyleSheet,TextInput,Button,Text, View} from 'react-native';

const App = () => {
    const [text, onChangeText] = React.useState('enter your text ');

  
    return (
        <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <Text style={styles.text}>{text}</Text>
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
  export default App;  