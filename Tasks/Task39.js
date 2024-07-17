
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from '../Redux/Store';
import ComponentOne from '../Components/Task39Component1';
import { show } from '../Redux/Actions';

const MainComponent = () => {
  const dispatch = useDispatch();
  const isComponentVisible = useSelector((state) => state.isComponentVisible);

  const pressButtonFunction = () => {
    dispatch(show());
  };

  return (
    <View style={styles.container}>
      <Button title={!isComponentVisible?"show":"hide"} onPress={pressButtonFunction} color="green" />
      {isComponentVisible && <ComponentOne />}
    </View>
  );
};

const App = () => (
  <Provider store={store}>
    <MainComponent />
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
