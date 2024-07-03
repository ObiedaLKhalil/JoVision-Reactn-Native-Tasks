import React, { useState,useEffect } from 'react';
import {ActivityIndicator, StyleSheet,Text, View} from 'react-native';

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    
  useEffect(() => {
 setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    
    return () =>setIsLoading(true);
  }, []);
    return (
      
      <View style={[styles.container, styles.horizontal]}>
        {isLoading ?<ActivityIndicator animating={isLoading}/>
        : 
          <Text>my  name is Obieda Khalil</Text>
        }
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
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
export default App;



