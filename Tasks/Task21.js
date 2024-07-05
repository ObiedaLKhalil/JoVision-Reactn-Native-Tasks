import React, { useState,useEffect } from 'react';
import { StyleSheet,Button,Text, View} from 'react-native';
const App = () => {
    const [isshowText, setshowText] = useState(false);
    const toggleShow = () => {
        setshowText(!isshowText); 
      };
  
    return (
      
        <View style={styles.container}>
        {isshowText && <Text style={styles.text}>Hello, My name is Obieda</Text>}
        
        <Button
          title={isshowText ? 'Hide' : 'Show'}
          onPress={toggleShow}
        />
        {!isshowText && console.log('MyClassPage unloaded')}
        {isshowText  && console.log('MyClassPage loaded')} 
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
});
export default App;