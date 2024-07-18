import React ,{Component} from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Provider,connect} from 'react-redux';
import store from '../Redux/Store';
import ComponentOne from '../Components/Task40Component1';
import { show } from '../Redux/Actions';
class  MainComponent extends Component{
constructor(props){
  super(props);
  this.state={};
}
pressButtonFunction = () => {
  //this like  
  //dispatch(show()); 
 this.props.show();
};
render(){
  //The render method destructures isComponentVisible from this.props.
  //it is like 
   // const isComponentVisible = useSelector((state) => state.isComponentVisible);

  const { isComponentVisible } = this.props;

return( <View style={styles.container}>


  <Button title={!isComponentVisible?"show":"hide"} onPress={()=>this.pressButtonFunction()} color="green" />
  {isComponentVisible && <ComponentOne />}
</View>);

}
}

const mapStateToProps = (state) => ({
  isComponentVisible: state.isComponentVisible,
});


const mapDispatchToProps = {
  show,
};


const ConnectedMainComponent = connect(mapStateToProps, mapDispatchToProps)(MainComponent);

 
const App = () => (
  <Provider store={store}>
    <ConnectedMainComponent />
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
