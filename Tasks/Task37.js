import React from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, RefreshControl } from 'react-native';

const generateRandomWord = (length) => {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

const App = () => {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 5000);
    }, []);

    const len = 100;
    const greetings = Array.from({ length: len }, (_, index) => (
        <Text key={index} style={styles.text}>
            {generateRandomWord(10)}
        </Text>
    ));

    return (
        <SafeAreaView style={styles.container}>
          
            <ScrollView
                style={styles.scrollView}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {greetings}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        paddingBottom :StatusBar.currentHeight,
        backgroundColor:'#99FF99',
    },
    scrollView: {
        backgroundColor: '#FFFF66',
        marginHorizontal: 10,
        paddingHorizontal: 15,
    },
    text: {
        fontSize: 42,
    },
});

export default App;
