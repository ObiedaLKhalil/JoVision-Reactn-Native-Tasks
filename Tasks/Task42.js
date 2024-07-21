import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, Button, StyleSheet, Text } from 'react-native';
const Screen1 = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <Text>Screen 1</Text>
    <Button
      title="Go to Screen 2"
      onPress={() => navigation.navigate('Screen2')}
    color="green" />
    <Button
      title="Go to Screen 3"
      onPress={() => navigation.navigate('Screen3')}
      color="orange"/>
     <Button
      title="Go to Screen 4"
      onPress={() => navigation.navigate('Screen4')}
      color="red"/>
  </SafeAreaView>
);

const Screen2 = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <Text>Screen 2</Text>
    <Button
      title="Go to Screen 1"
      onPress={() => navigation.navigate('Screen1')}
      color="purple" />
    <Button
      title="Go to Screen 3"
      onPress={() => navigation.navigate('Screen3')}
      color="orange"/>
     <Button
      title="Go to Screen 4"
      onPress={() => navigation.navigate('Screen4')}
      color="red" />
  </SafeAreaView>
);

const Screen3 = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <Text>Screen 3</Text>
    <Button
      title="Go to Screen 1"
      onPress={() => navigation.navigate('Screen1')}
      color="purple"/>
    <Button
      title="Go to Screen 2"
      onPress={() => navigation.navigate('Screen2')}
      color="green"/>
     <Button
      title="Go to Screen 4"
      onPress={() => navigation.navigate('Screen4')}
      color="red" />
  </SafeAreaView>
);
const Screen4 = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <Text>Screen 4</Text>
    <Button
      title="Go to Screen 1"
      onPress={() => navigation.navigate('Screen1')}
      color="purple"/>
    <Button
      title="Go to Screen 2"
      onPress={() => navigation.navigate('Screen2')}
      color="green"/>
    <Button
      title="Go to Screen 3"
      onPress={() => navigation.navigate('Screen3')}
      color="orange"/>
    
  </SafeAreaView>
);

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Screen1" >
        <Tab.Screen name="Screen1" component={Screen1}   options={{  title: 'Screen1', headerTitleAlign: 'center',headerTintColor:"blue" }} />
        <Tab.Screen name="Screen2" component={Screen2}   options={{ title: 'Screen2', headerTitleAlign: 'center',headerTintColor:"blue" }}/>
        <Tab.Screen name="Screen3" component={Screen3}   options={{  title: 'Screen3', headerTitleAlign: 'center' ,headerTintColor:"blue"}} />
        <Tab.Screen name="Screen4" component={Screen4}   options={{  title: 'Screen4', headerTitleAlign: 'center',headerTintColor:"blue"}} />
       
        </Tab.Navigator>
     </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', // Center text horizontally
  },
});

export default App;
