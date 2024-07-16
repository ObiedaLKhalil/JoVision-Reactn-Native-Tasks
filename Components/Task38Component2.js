import React, { useContext } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import MyClassPage from '../Components/Task38Component1';
import { SharedTextContext } from '../Components/ContextProviderTask38';;

const Component2 = () => {
  const { sharedText, setSharedText } = useContext(SharedTextContext);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={sharedText}
        onChangeText={setSharedText}
      
      />
      <MyClassPage />
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
    color: '#993366',
  },
});

export default Component2;