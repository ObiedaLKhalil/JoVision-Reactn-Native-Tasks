import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

class MyClassPage extends Component {
  constructor() {
    super();
    this.state = {
      showText: false
    };
  }

 

  show = () => {
    this.setState({ showText: !this.state.showText });
  };



  render() {
    return (
      <View style={styles.container}>
        {this.state.showText && <Text style={styles.text}>Hello, My name is Obieda</Text>}
        
        <Button
          title={this.state.showText ? 'Hide' : 'Show'}
          onPress={this.show}
        />
        {!this.state.showText && console.log('MyClassPage unloaded')}
        {this.state.showText  && console.log('MyClassPage loaded')} 
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
    marginTop: 20,
  },
});

export default MyClassPage;