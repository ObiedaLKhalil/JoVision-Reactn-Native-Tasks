import React, { useState,useEffect,Component} from 'react';
import { StyleSheet,TextInput,Text, View} from 'react-native';

class MyClassPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'enter your text'
     
   
    };
    this.onChangeText = this.onChangeText.bind(this);
  }

  onChangeText = (text) => {
    this.setState({ text }); 
  };
  

  render() {
    return (
      <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={this.onChangeText}
       value={this.state.text}
      />
      <Text style={styles.text}>{this.state.text}</Text>
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
  input: {
    height: 59,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default MyClassPage;