import React, { useState,useEffect } from 'react';
import { StyleSheet,TextInput,Button,Text, View} from 'react-native';
import  Task38Component2 from '../Components/Task38Component2';
import { SharedTextProvider } from '../Components/ContextProviderTask38';
const App = () => {
    

  
    return (
      <SharedTextProvider>
        <View style={styles.container}>
        
        
         <Task38Component2 />
         <Task38Component2 />
         <Task38Component2 />
         <Task38Component2 />
        </View>
        </SharedTextProvider>
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
        color: '#993366',
      }, 
      input: {
      height: 40,
      borderColor: '#993366',
      borderWidth: 1,
      marginBottom: 30,
      paddingHorizontal: 8,
      borderTopWidth :4,
      borderBottomWidth :4,
      borderRightWidth :4,
      borderLeftWidth :4,
      color: '#993366',
    
        },
  });
  export default App;  