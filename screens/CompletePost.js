import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Image, View, Alert, Text } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { uploadPost } from '../functions/UploadPost'; //Pass it the uri, and the postdata object
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StackActions, NavigationActions, NavigationEvents } from 'react-navigation';
import { FAB } from 'react-native-paper';
import { db, storage } from '../config';
import RNFetchBlob from 'react-native-fetch-blob';




const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
const Fetch = RNFetchBlob.polyfill.Fetch
// replace built-in fetch
window.fetch = new Fetch({
    // enable this option so that the response data conversion handled automatically
    auto : true,
    // when receiving response data, the module will match its Content-Type header
    // with strings in this array. If it contains any one of string in this array, 
    // the response body will be considered as binary data and the data will be stored
    // in file system instead of in memory.
    // By default, it only store response data to file system when Content-Type 
    // contains string `application/octet`.
    binaryContentTypes : [
        'image/',
        'video/',
        'audio/',
        'foo/',
    ]
}).build()





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
        this.imageTest = this.imageTest.bind(this);
        this.handlePress = this.handlePress.bind(this);
        this.cameraPress = this.cameraPress.bind(this);
        this.cityInput = React.createRef();
        this.state = {
            Description: '',
            Coordinates: [],
            Title: '',
            Helpers: [],
            Size: 0,
            Image: 'Placeholder',
            ImageDone: 'Placeholder',
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
        this.setState({ Size: text })
        this.onEnterText(text)
    }

    onChangeText2 = (text) => {
        this.setState({ Helpers: text })
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
        // let uri = "";
        // let that = this;
        // storage.ref('photos').child(this.state.uri).getDownloadURL()
        // .then((url)=>{
        //     that.setState={url};
        // });
        fetch('https://trash-app-api.herokuapp.com/Cleaned', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Description: this.state.Description,
                Coordinates: this.state.region,
                Title: this.state.Title,
                Image: this.state.Image,
                ImageDone: this.state.ImageDone,
                Helpers: this.state.Helpers,
                Size: this.state.Size
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
        this.props.navigation.navigate('Progress')
    }

    imageTest(path) {
        let imageRef = storage.ref('photos').child(path);
        imageRef.getDownloadURL()
            .then((url) => {
                this.setState({ ImageDone: url })
            }).catch(function (error) {
                console.log(error)
            });
    }

    async componentDidMount() {
        const { navigation } = this.props;
        const Image = navigation.dangerouslyGetParent().getParam('Image', 'Trouble loading image');
        const Title = navigation.dangerouslyGetParent().getParam('Title', 'Trouble loading title');
        const Description = navigation.dangerouslyGetParent().getParam('Description', 'Trouble loading description');
        // this.setState({ Image, Title, Description })
        const position = await getCurrentLocation();
        if (position) {
            this.setState({
                region: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                },
                Image,
                Title,
                Description
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
        const { navigation } = this.props;
        const Uri = navigation.dangerouslyGetParent().getParam('uri', 'Trouble loading image');
        return (
            <>
                <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <SafeAreaView style={styles.container}>
                        <NavigationEvents
                            onDidFocus={() => {
                                const { navigation } = this.props;
                                // console.log(" 7 7 77 7 7 7 77 7 7 77 7 7 77  7 77 7 7 7 77 7 77                   ");
                                // console.log(navigation.dangerouslyGetParent().getParam('uri'));
                                // console.log(" 7 7 77 7 7 7 77 7 7 77 7 7 77  7 77 7 7 7 77 7 77                   ");
                                if (navigation.dangerouslyGetParent().getParam('uri')) {
                                    const photoUri = navigation.dangerouslyGetParent().getParam('uri', 'Trouble loading image');
                                    // await this.setState({ uri: photoUri })



                                    // const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
                                    let that = this;
                                    mime = 'application/octet-stream';
                                    const imageRef = storage.ref('photos').child(photoUri);
                                    // console.log("                     1     1111111                   ");
                                    fs.readFile(photoUri, 'base64')
                                        .then((data) => {
                                            // console.log("2     222222 2 2  2 22  2 22 22 2 22 ");
                                            return Blob.build(data, { type: `${mime};BASE64` })
                                        })
                                        .then((blob) => {
                                            // console.log("33 3 3 3 33 33 3 3 3 33 3 33 3 3 33 3 3 ");
                                            uploadBlob = blob
                                            return imageRef.put(blob, { contentType: mime })
                                        })
                                        .then(async () => {
                                            // console.log(" 4 444 4 4 4 4 4 4 4 4 4 44 4  4 4 44  4");
                                            let hello = await imageRef.getDownloadURL()
                                            that.setState({ ImageDone: hello, uri: photoUri });
                                            // uploadBlob.close();
                                            // url = downUrl;
                                        })
                                        .catch((error) => {
                                            console.log(error)
                                        });



                                }
                                // this.setState({ uri: photoUri }) 
                                // console.log("Hello");
                            }}
                        // onWillFocus={uploadPost(this.state.uri, { name: '' })}
                        // onDidFocus={uploadPost(this.state.uri, { name: '' })}
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
                            keyboardType='number-pad'
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
                            onPressOut={this.state.TextInputValue == "" ? this.buttonClickListener : this.state.TextInputValue2 == "" ? this.buttonClickListener : this.handlePress}
                            // onPress={() => this.setState({ImageDone: })}
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

