import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { setText } from '../Redux/Actions';

class ComponentOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.storedText,
    };
  }

  componentWillUnmount() {
    this.props.setText(this.state.text);
  }

  ChangeText = (newText) => {
    this.setState({ text: newText });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={this.state.text}
          onChangeText={this.ChangeText}
          placeholder="Type here"
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
  input: {
    height: 40,
    borderColor: '#993366',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 8,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderLeftWidth: 4,
    color: 'red',
    fontWeight: 'bold',
  },
});

const mapStateToProps = (state) => ({
  storedText: state.text,
});

const mapDispatchToProps = {
  setText,
};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentOne);
