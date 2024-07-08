import React, { useRef,useState,useEffect,Component} from 'react';
import { StyleSheet,TextInput,Text, View,c, Button,ActivityIndicator} from 'react-native';

const GetIP = () => { 
    const [ip, setIp] = useState('');
    const [loading, setLoading] = useState(false);
    const nonBlocking = () => {
        fetch('https://api.ipify.org?format=json')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                
                setIp(data.ip);
            })
            .catch((error) => {
                console.error("error is found");
               
            });
    };
      
      const Blocking = async () => {
        setLoading(true); 
        try {
          const response = await fetch('https://api.ipify.org?format=json')
          const data = await response.json();
          console.log(data);
          setIp(data.ip);
        } catch (error) {
          console.log("error is found");

        }
        finally {
            setLoading(false);  
          }
      };
    return( 
        <View style={styles.container}>
        
        <Button title="nonBlocking" onPress={nonBlocking} ></Button>
        <Button title="Blocking" onPress={Blocking} ></Button>
        <Text style={styles.text}>IP Address: {ip}</Text>
     
    
        {loading && <ActivityIndicator size="large" color="green" />}

      </View>
    );
  };
        
        


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 20,
      marginTop: 50,
      color:'red'
    }, 
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
      button: {
        backgroundColor: '#007AFF',
        color: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
      },
  });

export default GetIP; 