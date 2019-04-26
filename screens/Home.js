import React, { Component } from 'react';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StackActions, NavigationActions } from 'react-navigation';

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Camera' })],
});

const resetActionPost = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Post' })],
});

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.handlePress = this.handlePress.bind(this)
        this.state = {
            trashPost: [],
            cleanPost: [],
            pendingPost: []
        }
    }

    static navigationOptions = {
        title: 'Home',
    };

    getItems = async () => {
        try {
            let response = await fetch('https://trash-app-api.herokuapp.com/Posts', {
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

    componentDidMount() {
        this.getItems()
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={{ width: '100%', flex: 1 }} contentContainerStyle={{ alignItems: 'center' }}>
                    {
                        this.state.trashPost.map((p, i) => {
                            return (
                                <Card
                                    key={i}
                                    containerStyle={{ backgroundColor: 'white', borderRadius: 10, borderColor: '#10C135', width: '95%', marginTop: 5, marginBottom: 5, borderWidth: 2 }}
                                    title={p.Title}
                                    titleStyle={{ color: 'black', fontSize: 24 }}
                                    image={require('../assets/trashExample.jpg')}>
                                    <Text style={{ marginBottom: 10, textAlign: 'center', color: 'black', fontSize: 16 }}>
                                        {p.Description}
                                    </Text>
                                    <View style={{ display: 'flex', alignItems: 'center' }}>
                                        <Button
                                            onPress={() => {this.props.navigation.navigate('Post', { Title: p.Title, Description: p.Description, Coordinates: p.Coordinates }); this.props.navigation.dispatch(resetActionPost)}}
                                            icon={<Icon name='calendar-check' color='#10C135' style={{ paddingRight: 10 }} />}
                                            containerStyle={{ width: 150, borderColor: '#10C135', borderWidth: 2 }}
                                            buttonStyle={{ borderRadius: 10, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: 'white' }}
                                            title='Pledge'
                                            titleStyle={{ color: '#10C135' }} 
                                        />
                                    </View>
                                </Card>
                            )
                        })
                    }
                </ScrollView>
                <FAB
                    style={styles.fab}
                    icon='camera'
                    onPress={this.handlePress} />
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
    }
})

