import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setText } from '../Redux/Actions';

const ComponentOne = () => {
  const dispatch = useDispatch();
  const storedText = useSelector((state) => state.text);
  const [text, setTextState] = useState(storedText);

  useEffect(() => {
    return () => {
      dispatch(setText(text));
    };
  }, [text, dispatch]);

  const handleTextChange = (newText) => {
    setTextState(newText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={handleTextChange}
        placeholder="Type here"
      />
    </View>
  );
};

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
    fontWeight:'bold',
  },
});

export default ComponentOne;