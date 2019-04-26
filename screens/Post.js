import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Image, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
//import { uploadPost } from '../functions/UploadPost'; //Pass it the uri, and the postdata object
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class Post extends Component {
    static navigationOptions = {
        title: 'Pledge',
    };

    constructor(props) {
        super(props);
        // this.handlePress = this.handlePress.bind(this)
        this.state = {
            uri: '',
            Description: '',
            Title: '',
            region: {
                latitude: 33.543682,
                longitude: -86.779633,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            },
        }
    }

    //handlePress() {
    // let postdata = {
    //     Description: this.state.Description,
    //     Coordinates: this.state.region,
    //     Title: this.state.Title
    // }
    // uploadPost(this.state.uri, postdata);

    //     fetch('https://trash-app-api.herokuapp.com/CreatePost', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             Description: this.state.Description,
    //             Coordinates: this.state.region,
    //             Title: this.state.Title
    //         }),
    //     }).then((response) => response.json())
    //         .then((responseJson) => {
    //             return responseJson;
    //         })
    //         .then((responseJson) => {
    //             console.log(responseJson)
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    //     uploadPost(this.state.uri, { name: '' })
    //     this.props.navigation.navigate('Home')
    // }

    async componentDidMount() {
        const { navigation } = this.props;
        // const photoUri = navigation.dangerouslyGetParent().getParam('uri', 'Trouble loading image');
        // this.setState({ uri: photoUri })
        const Title = navigation.dangerouslyGetParent().getParam('Title', 'Trouble loading title')
        const Description = navigation.dangerouslyGetParent().getParam('Description', 'Trouble loading description')
        const region = navigation.dangerouslyGetParent().getParam('Coordinates', 'Trouble loading coordinates')
        console.log(region)
        this.setState({ Title, Description, region })
        console.log(Title)
        console.log(Description)
    }

    render() {
        return (
            <>
                <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <SafeAreaView style={styles.container}>
                        <Image
                            style={styles.image} source={require('../assets/trashExample.jpg')}
                        />
                        <View
                            style={styles.divider}>
                        </View>
                        <MapView
                            style={styles.map}
                            provider={PROVIDER_GOOGLE}
                            region={this.state.region}
                            showsUserLocation={true}
                        >
                            <Marker
                                coordinate={this.state.region}
                                title={this.state.Title}
                                description={this.state.Description}
                            />
                        </MapView>
                        <View
                            style={styles.divider2}>
                        </View>
                        <Text style={styles.name}>{this.state.Title}</Text>
                        <Text style={styles.description}>{this.state.Description}</Text>
                        <Button
                            onPress={() => { this.props.navigation.navigate('Post', { Title: p.Title, Description: p.Description, Coordinates: p.Coordinates }); this.props.navigation.dispatch(resetActionPost) }}
                            icon={<Icon name='calendar-check' color='#10C135' style={{ paddingRight: 10 }} />}
                            containerStyle={{ width: 150, borderColor: '#10C135', borderWidth: 2, marginTop: 50 }}
                            buttonStyle={{ borderRadius: 10, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: 'white' }}
                            title='Pledge'
                            titleStyle={{ color: '#10C135' }}
                        />
                    </SafeAreaView>
                </KeyboardAwareScrollView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        height: 150,
        marginTop: 212
    },
    image: {
        height: 200,
        width: "100%"
    },
    divider: {
        borderColor: "#10C135",
        borderWidth: .5,
        height: 1,
        width: '100%',
        marginTop: 5
    },
    divider2: {
        borderColor: "#10C135",
        borderWidth: .5,
        height: 1,
        width: '100%',
        marginTop: 162
    },
    name: {
        color: 'black',
        fontSize: 24,
        marginTop: 20,
    },
    description: {
        color: 'black',
        fontSize: 18,
        marginTop: 20,
    }
})

