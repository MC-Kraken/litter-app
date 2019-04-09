import React, { Component } from 'react';
import { Text, SafeAreaView, StyleSheet} from 'react-native';
import { FAB } from 'react-native-paper';

export default class Account extends Component {
    static navigationOptions = {
        title: 'Account',
    };


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Account</Text>
                <FAB
                    style={styles.fab}
                    icon='camera'
                    onPress={() => this.props.navigation.navigate('Camera')} />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#10C135'
    },
    container: {
        flex: 1,
        backgroundColor: 'rgb(0, 119, 190)',
        justifyContent: 'center',
        alignItems: 'center'
    }
})