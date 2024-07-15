import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SharedTextContext } from '../Components/ContextProviderTask38';

class MyClassPage extends Component {
  static contextType = SharedTextContext;

  render() {
    const { sharedText } = this.context;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{sharedText }</Text>
      </View>
    );
  }
}

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

export default MyClassPage;
