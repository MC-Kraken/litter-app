import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Image, View, KeyboardAvoidingView } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { uploadPost } from '../functions/UploadPost'; //Pass it the uri, and the postdata object
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';


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
        this.state = {
            uri: 'Placeholder',
            region: {
                latitude: 33.543682,
                longitude: -86.779633,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }
        }
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
                <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={100}>
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
                        
                        <Input
                            inputStyle={{ color: 'white' }}
                            inputContainerStyle={{ borderBottomColor: '#10C135' }}
                            placeholderTextColor="white"
                            placeholderStyle={{color: '#10C135'}}
                            containerStyle={{ marginTop: 170 }}
                            placeholder='Description'
                            leftIcon={
                                <Icon
                                    name='comment'
                                    size={24}
                                    color='#10C135'
                                    style={{ marginRight: 5 }}
                                />
                            }
                        />
                        <Button
                            title="Post"
                            titleStyle={{ color: "white" }}
                            onPress={uploadPost(this.state.uri, { name: '' })}
                            containerStyle={{ width: 150, height: 20, marginTop: 100 }}
                            buttonStyle={{ backgroundColor: "#10C135" }}
                        />
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(0, 119, 190)',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        height: 150,
        marginTop: 215
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
    }
})

