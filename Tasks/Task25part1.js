import React, { useRef,useImperativeHandle,useState,useEffect,Component,forwardRef} from 'react';
import { StyleSheet,TextInput,Text, View} from 'react-native';

// Child Component























class ChildComponentClass extends Component {
    constructor(props) {
      super(props);
      this.state = {
        textt: 'enter your text '
      };
    }
  
    ChangeText = (newT) => {
      this.setState({ textt: newT });
    };
  
    getTextt = () => {
      return this.state.textt;
    };
  
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>{this.state.textt}</Text>
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
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
  });
  export default ChildComponentClass;

