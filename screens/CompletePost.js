import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Image, View, Alert, Text } from 'react-native';
import { Button, Input } from 'react-native-elements';
// import { uploadPost } from '../functions/UploadPost'; //Pass it the uri, and the postdata object
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StackActions, NavigationActions, NavigationEvents } from 'react-navigation';
import { FAB } from 'react-native-paper';



// const resetActionHome = StackActions.reset({
//     index: 0,
//     key: 'Home',
//     actions: [NavigationActions.navigate({ routeName: 'Home' })],
// });

const resetActionCamera = StackActions.reset({
    index: 0,
    key: 'CompleteCamera',
    actions: [NavigationActions.navigate({ routeName: 'CompleteCamera' })],
});


export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
    });
};

export default class CompletePost extends Component {
    static navigationOptions = {
        title: 'Complete Post',
    };

    constructor(props) {
        super(props);
        // this.handlePress = this.handlePress.bind(this);
        this.cameraPress = this.cameraPress.bind(this);
        this.cityInput = React.createRef();
        this.state = {
            Description: '',
            Coordinates: [],
            Title: '',
            Image: 'Placeholder',
            uri: 'Placeholder',
            after: false,
            TextInputValue: '',
            ErrorStatus: true,
            TextInputValue2: '',
            ErrorStatus2: true,
            region: {
                latitude: 33.543682,
                longitude: -86.779633,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            },
        }
    }

    onEnterText = (TextInputValue) => {
        if (TextInputValue.trim() != 0) {
            this.setState({ TextInputValue: TextInputValue, ErrorStatus: true });
        } else {
            this.setState({ TextInputValue: TextInputValue, ErrorStatus: false });
        }
    }

    onEnterText2 = (TextInputValue2) => {
        if (TextInputValue2.trim() != 0) {
            this.setState({ TextInputValue2: TextInputValue2, ErrorStatus2: true });
        } else {
            this.setState({ TextInputValue2: TextInputValue2, ErrorStatus2: false });
        }
    }

    onChangeText = (text) => {
        this.setState({ Description: text })
        this.onEnterText(text)
    }

    onChangeText2 = (text) => {
        this.setState({ Title: text })
        this.onEnterText2(text)
    }

    buttonClickListener = () => {
        const { TextInputValue } = this.state;
        const { TextInputValue2 } = this.state;
        if (TextInputValue == "" || TextInputValue2 == "") {
            Alert.alert("Please enter the details to proceed");
        }
    }

    cameraPress = () => {
        this.props.navigation.navigate('CompleteCamera');
        this.props.navigation.dispatch(resetActionCamera);
        this.setState({ after: true })
    }

    handlePress() {
    //     fetch('https://trash-app-api.herokuapp.com/CreatePost', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             Description: this.state.Description,
    //             Coordinates: this.state.region,
    //             Title: this.state.Title,
    //             Image: this.state.uri
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
        this.props.navigation.dispatch(resetActionHome)
        this.props.navigation.navigate('Home')
    }

    async componentDidMount() {
        const { navigation } = this.props;
        const Image = navigation.dangerouslyGetParent().getParam('Image', 'Trouble loading image');
        this.setState({ Image })
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
        let render
        if (this.state.after === true) {
            render = <Image
                style={styles.image}
                source={{ uri: this.state.uri }}
            />
        } else {
            render = <FAB
                style={styles.fab}
                icon='camera-alt'
                onPress={this.cameraPress}
            />
        }
        console.log(this.state.after)
        return (
            <>
                <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <SafeAreaView style={styles.container}>
                        <NavigationEvents
                            onWillFocus={() => {
                                const { navigation } = this.props;
                                const photoUri = navigation.dangerouslyGetParent().getParam('uri', 'Trouble loading image');
                                this.setState({ uri: photoUri })
                            }}
                            onDidBlur={() => this.setState({ after: true })}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flex: 1 }}>
                                <Image
                                    style={styles.image}
                                    source={{ uri: this.state.Image }}
                                />
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                {render}
                                {/* <FAB
                                    style={styles.fab}
                                    icon='camera-alt'
                                    onPress={this.cameraPress}
                                />
                                <Image
                                    style={styles.image}
                                    source={{ uri: this.state.uri }}
                                /> */}
                            </View>
                        </View>
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
                            returnKeyType="next"
                            onSubmitEditing={() => { this.cityInput.current.focus(); }}
                            onChangeText={this.onChangeText}
                            inputStyle={{ color: 'black' }}
                            inputContainerStyle={{ borderBottomColor: '#10C135' }}
                            placeholderTextColor="#A9A9A9"
                            placeholderStyle={{ color: '#10C135' }}
                            containerStyle={{ marginTop: 30 }}
                            placeholder='How many trash bags did you use?'
                            leftIcon={
                                <Icon
                                    name='trash-alt'
                                    size={24}
                                    color='#10C135'
                                    style={{ marginRight: 5, marginLeft: -5 }}
                                />
                            }
                        />
                        <Input
                            ref={this.cityInput}
                            onChangeText={this.onChangeText2}
                            inputStyle={{ color: 'black' }}
                            inputContainerStyle={{ borderBottomColor: '#10C135' }}
                            placeholderTextColor="#A9A9A9"
                            placeholderStyle={{ color: '#10C135' }}
                            containerStyle={{ marginTop: 20 }}
                            placeholder='Who helped?'
                            leftIcon={
                                <Icon
                                    name='users'
                                    size={24}
                                    color='#10C135'
                                    style={{ marginRight: 5, marginLeft: -5 }}
                                />
                            }
                        />
                        <Text style={{ color: 'white', fontSize: 16 }}>{this.state.saved}</Text>
                        <Button
                            icon={<Icon name='check' color="#10C135" style={{ paddingRight: 10 }} />}
                            title="Complete"
                            titleStyle={{ color: "#10C135" }}
                            onPress={this.state.TextInputValue == "" ? this.buttonClickListener : this.state.TextInputValue2 == "" ? this.buttonClickListener : this.handlePress}
                            // onPressOut={uploadPost(this.state.uri, { name: '' })}
                            containerStyle={{ width: 150, marginTop: 10, borderColor: "#10C135", borderWidth: 2 }}
                            buttonStyle={{ backgroundColor: "white", borderRadius: 10 }}
                        />
                    </SafeAreaView>
                </KeyboardAwareScrollView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    fab: {
        backgroundColor: '#10C135',
    },
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
        width: "100%",
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

