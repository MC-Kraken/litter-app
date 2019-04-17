import React, { Component } from 'react';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import HomeTrash from '../functions/HomeTrash';
import { ScrollView } from 'react-native-gesture-handler';




export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Home',
        trashPost: [],
        cleanPost: [],
        pendingPost: []
    };

    render() {

        // const trashPost = this.state.trashPost

        return (
            <SafeAreaView style={styles.container}>
               <ScrollView style={{ width: '100%', flex: 1 }} contentContainerStyle={{ alignItems: 'center' }}>
                    <HomeTrash />
                </ScrollView>
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
        alignItems: 'center'
    }
})

