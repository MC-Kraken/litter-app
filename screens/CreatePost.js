import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Image, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { uploadPost } from '../functions/UploadPost'; //Pass it the uri, and the postdata object
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StackActions, NavigationActions } from 'react-navigation';

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Home' })],
  });

export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
    });
};

export default class CreatePost extends Component {
    static navigationOptions = {
        title: 'Create a Post',
    };

    constructor(props) {
        super(props);
        this.handlePress = this.handlePress.bind(this)
        this.state = {
            uri: 'Placeholder',
            Description: '',
            Coordinates: [],
            Title: '',
            region: {
                latitude: 33.543682,
                longitude: -86.779633,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            },
        }
    }

    handlePress() {
        // let postdata = {
        //     Description: this.state.Description,
        //     Coordinates: this.state.region,
        //     Title: this.state.Title
        // }
        // uploadPost(this.state.uri, postdata);

        fetch('https://trash-app-api.herokuapp.com/CreatePost', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Description: this.state.Description,
                Coordinates: this.state.region,
                Title: this.state.Title
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .then((responseJson) => {
                console.log(responseJson)
            })
            .catch((error) => {
                console.error(error);
            });
        uploadPost(this.state.uri, { name: '' })
        this.props.navigation.navigate('Home')
        this.props.navigation.dispatch(resetAction)
    }

    async componentDidMount() {
        const { navigation } = this.props;
        const photoUri = navigation.dangerouslyGetParent().getParam('uri', 'Trouble loading image');
        this.setState({ uri: photoUri })
        const position = await getCurrentLocation();
        if (position) {
            this.setState({
                region: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                },
            });
        }
    }

    render() {
        return (
            <>
                <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <SafeAreaView style={styles.container}>
                        <Image
                            style={styles.image} source={{ uri: this.state.uri }}
                        />
                        <View
                            style={styles.divider}>
                        </View>
                        <MapView
                            style={styles.map}
                            provider={PROVIDER_GOOGLE}
                            region={this.state.region}
                            showsUserLocation={true}
                        />
                        <View
                            style={styles.divider2}>
                        </View>
                        <Input
                            onChangeText={text => this.setState({ Description: text })}
                            inputStyle={{ color: 'white' }}
                            inputContainerStyle={{ borderBottomColor: '#10C135' }}
                            placeholderTextColor="white"
                            placeholderStyle={{ color: '#10C135' }}
                            containerStyle={{ marginTop: 30 }}
                            placeholder='Describe Location'
                            leftIcon={
                                <Icon
                                    name='comment-alt'
                                    size={24}
                                    color='#10C135'
                                    style={{ marginRight: 5, marginLeft: -5 }}
                                />
                            }
                        />
                        <Input
                            onChangeText={text => this.setState({ Title: text })}
                            inputStyle={{ color: 'white' }}
                            inputContainerStyle={{ borderBottomColor: '#10C135' }}
                            placeholderTextColor="white"
                            placeholderStyle={{ color: '#10C135' }}
                            containerStyle={{ marginTop: 20 }}
                            placeholder='What city?'
                            leftIcon={
                                <Icon
                                    name='users'
                                    size={24}
                                    color='#10C135'
                                    style={{ marginRight: 5, marginLeft: -5 }}
                                />
                            }
                        />
                        <Button
                            icon={<Icon name='upload' color='#ffffff' style={{ paddingRight: 10 }} />}
                            title="Post"
                            titleStyle={{ color: "white" }}
                            onPress={this.handlePress}
                            containerStyle={{ width: 150, height: 20, marginTop: 30 }}
                            buttonStyle={{ backgroundColor: "#10C135" }}
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
        backgroundColor: 'rgb(0, 119, 190)',
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
    }
})

