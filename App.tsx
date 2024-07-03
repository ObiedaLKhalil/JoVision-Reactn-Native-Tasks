import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const App = () => {
  const [isVisible, setIsVisible] = useState(false); 

  const toggleVisibility = () => {
    setIsVisible(!isVisible); 
  };

  return (
    <View style={styles.container}>
      <Button title={'click'} onPress={toggleVisibility} />
      {isVisible && <Text style={styles.text}>My name is Obieda Khalil</Text>}
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
    fontSize: 50,
    marginTop: 20,
  },
});

export default App;