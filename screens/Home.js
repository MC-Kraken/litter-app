import React, { Component } from 'react';
import { Text, View, SafeAreaView, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { FAB } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StackActions, NavigationActions, NavigationEvents } from 'react-navigation';
import { db, storage } from '../config'

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
            pendingPost: [],
            loaded: false,
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
                            containerStyle={{ backgroundColor: 'white', borderRadius: 10, borderColor: '#10C135', width: '95%', marginTop: 5, marginBottom: 5, borderWidth: 2 }}
                            title={p.Title}
                            dividerStyle={{ shadowColor: '#10C135' }}
                            titleStyle={{ color: 'black', fontSize: 24 }}
                        >
                            <Image
                                key={i}
                                style={{ height: 200, width: "100%", marginBottom: 10, borderColor: '#10C135', borderWidth: 1 }}
                                source={{ uri: p.Image }}
                            />
                            <Text style={{ marginBottom: 10, textAlign: 'center', color: 'black', fontSize: 16 }}>
                                {p.Description}
                            </Text>
                            <View style={{ display: 'flex', alignItems: 'center' }}>
                                <Button
                                    onPress={() => { this.props.navigation.navigate('Post', { Title: p.Title, Description: p.Description, Coordinates: p.Coordinates, Image: p.Image }); this.props.navigation.dispatch(resetActionPost) }}
                                    containerStyle={{ width: 150, borderColor: '#10C135', borderWidth: 2 }}
                                    buttonStyle={{ borderRadius: 10, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: 'white' }}
                                    title='View'
                                    titleStyle={{ color: '#10C135' }}
                                />
                            </View>
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

// class ListItem extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             imgUrl: ''
//         }
//         this.imageTest = this.imageTest.bind(this)
//     }

//     imageTest(path) {
//         let imageRef = storage.ref('photos').child(path);
//         imageRef.getDownloadURL()
//             .then((url) => {
//                 this.setState({ imgUrl: url })
//             }).catch(function (error) {
//                 console.log(error)
//             });
//         console.log(imageRef)
//     }

//     componentDidMount() {
//         this.imageTest(this.props.item.Image)
//     }

//     render() {
//         const { item, i } = this.props
//         return (
//             <Card
//                 key={i}
//                 containerStyle={{ backgroundColor: 'white', borderRadius: 10, borderColor: '#10C135', width: '95%', marginTop: 5, marginBottom: 5, borderWidth: 2 }}
//                 title={item.Title}
//                 dividerStyle={{ shadowColor: '#10C135' }}
//                 titleStyle={{ color: 'black', fontSize: 24 }}
//             >
//                 <Image
//                     key={i}
//                     style={{ height: 200, width: "100%", marginBottom: 10, borderColor: '#10C135', borderWidth: 1 }}
//                     source={{ uri: this.state.imgUrl }}
//                 />
//                 <Text style={{ marginBottom: 10, textAlign: 'center', color: 'black', fontSize: 16 }}>
//                     {item.Description}
//                 </Text>
//                 <View style={{ display: 'flex', alignItems: 'center' }}>
//                     <Button
//                         onPress={() => { this.props.navigation.navigate('Post', { Title: item.Title, Description: item.Description, Coordinates: item.Coordinates, Image: this.state.imgUrl }); this.props.navigation.dispatch(resetActionPost) }}
//                         containerStyle={{ width: 150, borderColor: '#10C135', borderWidth: 2 }}
//                         buttonStyle={{ borderRadius: 10, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: 'white' }}
//                         title='View'
//                         titleStyle={{ color: '#10C135' }}
//                     />
//                 </View>
//             </Card>
//         )
//     }
// }

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

