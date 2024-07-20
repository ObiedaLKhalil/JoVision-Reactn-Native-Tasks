import React, { useState,useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

// Create simple screen components
const Screen1 = () => (
  <View style={styles.container}>
    <Text>Screen 1</Text>
  </View>
);

const Screen2 = () => (
  <View style={styles.container}>
    <Text>Screen 2</Text>
  </View>
);

const Screen3 = () => (
  <View style={styles.container}>
    <Text>Screen 3</Text>
  </View>
);

const Screen4 = () => (
  <View style={styles.container}>
    <Text>Screen 4</Text>
  </View>
);

// Create bottom tab navigator
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Screen1" component={Screen1} />
        <Tab.Screen name="Screen2" component={Screen2} />
        <Tab.Screen name="Screen3" component={Screen3} />
        <Tab.Screen name="Screen4" component={Screen4} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default App;
