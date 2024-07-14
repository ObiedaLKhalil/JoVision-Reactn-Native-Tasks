import React, { useState, useEffect } from 'react';
import {View,TextInput,Button,Text,StyleSheet,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
 const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    const loadingFunction = async () => {
      try {
        const loadData = await AsyncStorage.getItem('userInfo');
        if (loadData) {
          const parsedData = JSON.parse(loadData);
          const { name, age, country, timestamp } = parsedData;

         

          if ((new Date().getTime() - new Date(timestamp).getTime()) / (1000 * 60) < 1) {
            setName(name);
            setAge(age);
            setCountry(country);
            setTimestamp(timestamp);
          }
        }
      } catch (error) {
        console.log("error is found while loading data");
      }
    };

    loadingFunction();
  }, []);

  const submitFunction = async () => {
    const userInfoObject = {
      name,
      age,
      country,
      timestamp: new Date().toISOString(),
    };

    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfoObject));
      Alert.alert('Data saved successfully!');
    } catch (error) 
      {console.log("error is found")};
    
  };

  return (
    <View style={styles.container}>
  
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Country"
          value={country}
          onChangeText={setCountry}
        />
        <Button title="Submit" onPress={submitFunction} color="purple" />
      
      {timestamp && (
        <Text style={styles.timestamp}>
          Last submitted: {new Date(timestamp).toLocaleString()}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  
  input: {
    height: 40,
    borderColor: 'purple',
    borderWidth: 1,
    marginBottom: 30,
    paddingHorizontal: 8,
  },
  timestamp: {
    marginTop: 16,
    textAlign: 'center',
    color: 'grey',
  fontWeight:"bold",
  },
});

export default App;
