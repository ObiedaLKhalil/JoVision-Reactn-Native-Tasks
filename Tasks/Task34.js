// App.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import useCurrentTime from './useCurrentTime';

const TimeDisplay = () => {
  const currentTime = useCurrentTime();
  const [showTime, setShowTime] = useState(true);
  const toggleTimeDisplay = () => {
    setShowTime(!showTime);
  };
  return (
    <View style={styles.container}>
      <Text >TIME AND DATE</Text>
      {showTime &&
    <View style={styles.timeContainer}>
      <Text style={styles.timeText}>
        {currentTime.toLocaleTimeString()}
      </Text>
      <Text style={styles.dateText}>
        {currentTime.toLocaleDateString()}
      </Text>
      </View>
      }
      <Button title={showTime?'hide':'show'} onPress={toggleTimeDisplay} color="red" high="200" />
     
    </View>
  );
};






const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  timeContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 55,
    color:'green',
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 30,
    color:'green',
    marginTop: 15,
  },
});

export default TimeDisplay;
