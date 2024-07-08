import React, { useRef,useImperativeHandle,useState,useEffect,Component,forwardRef} from 'react';
import { StyleSheet,TextInput,Text, View} from 'react-native';

// Child Component
const ChildComponent =forwardRef((props, ref)=> {
    
  const [textt, settext] = React.useState('enter your text ');
    useImperativeHandle(ref, () => ({
      ChangeText,
      getTextt: () => textt,
      
    }));

    const ChangeText = (newT) => { 
     console.log("new text", newT);
     settext(newT);
  }  
    

return(   <View style={styles.container}>
  
  <Text style={styles.text}>{textt}</Text>
  </View>
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
      marginTop: 30,
    }, 
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
  });
  export default ChildComponent;

