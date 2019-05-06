import React, { Component } from 'react';
import { Text, View, SafeAreaView, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { FAB } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';


const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Camera' })],
});

export default class Progress extends Component {
    constructor(props) {
        super(props);
        this.handlePress = this.handlePress.bind(this)
        this.state = {
            trashPost: [],
            cleanPost: [],
            pendingPost: [],
            loaded: false,
        }
    }

    static navigationOptions = {
        title: 'Impact',
    };

    getItems = async () => {
        try {
            let response = await fetch('https://trash-app-api.herokuapp.com/Cleaned', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            let res = await response.json();
            if (!res) {
                console.log('Nope');
            } else {
                this.setState({
                    trashPost: res,
                    loaded: true
                })
            }
        } catch (error) {
            console.log('Something went wrong');
        }
    }

    handlePress() {
        this.props.navigation.navigate('Camera')
        this.props.navigation.dispatch(resetAction)
    }

    render() {
        let feed,
            spinner
        if (this.state.loaded === true) {
            feed =
                this.state.trashPost.map((p, i) => {
                    return (
                        <Card
                            key={i}
                            containerStyle={{ backgroundColor: 'white', borderTopColor: '#10C135', borderBottomColor: '#10C135', borderLeftColor: 'white', borderRightColor: 'white', width: '100%', marginTop: 5, marginBottom: 5, paddingLeft: 0, paddingRight: 0, borderWidth: 2 }}
                            title={p.Title}
                            titleStyle={{ color: 'black', fontSize: 24 }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ flex: 1 }}>
                                    <Image
                                        key={i}
                                        style={{ height: 200, width: "100%", marginBottom: 10 }}
                                        source={{ uri: p.Image }}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Image
                                        key={i}
                                        style={{ height: 200, width: "100%", marginBottom: 10 }}
                                        source={{ uri: p.ImageDone }}
                                    />
                                </View>
                            </View>
                            <Text style={{ marginBottom: 0, textAlign: 'center', color: 'black', fontSize: 16 }}>
                                {p.Description}
                            </Text>
                        </Card>
                    )
                })
        } else {
            feed = null
            spinner =
                <View style={styles.spinnerContainer}>
                    <ActivityIndicator size="large" color="#10C135" />
                </View>
        }
        this.getItems()
        return (
            <SafeAreaView style={styles.container}>
                {spinner}
                <ScrollView style={{ width: '100%', flex: 1 }} contentContainerStyle={{ alignItems: 'center' }}>
                    {feed}
                </ScrollView>
                <FAB
                    style={styles.fab}
                    icon='camera-alt'
                    onPress={this.handlePress}
                />
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
        backgroundColor: 'white',
        alignItems: 'center'
    },
    spinnerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

