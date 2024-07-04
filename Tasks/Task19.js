import React, { useState,useEffect,Component } from 'react';
import {Button, StyleSheet,Text, View} from 'react-native';

class MyClassPage extends Component {
  constructor() {
    super();
    this.state = {
      showText: false
    };
  }

  show = () => {
    this.setState({ showText: true });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.showText && <Text style={styles.text}>Hello, My name is Obieda</Text>}
        
        <Button
          title="Show"
          onPress={this.show}
        />
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
      fontSize: 20,
      marginTop: 30,
    },
   
  });


  export default MyClassPage;




