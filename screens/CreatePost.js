import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Image, View } from 'react-native';
import { Button } from 'react-native-elements';
import { uploadPost } from '../functions/UploadPost'; //Pass it the uri, and the postdata object
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

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

    componentDidMount() {
        const { navigation } = this.props;
        const photoUri = navigation.dangerouslyGetParent().getParam('uri', 'Trouble loading image');
        this.setState({ uri: photoUri })
    }

    async componentDidMount() {
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
                <SafeAreaView style={styles.container}>
                    <Image style={{ height: 300, width: "100%" }} source={{ uri: this.state.uri }} />
                    <Button
                        title="Test Upload"
                        titleStyle={{ color: "white" }}
                        onPress={uploadPost(this.state.uri, { name: '' })}
                        containerStyle={{ width: 200, height: 20, marginTop: 20 }}
                        buttonStyle={{ backgroundColor: "#10C135" }}
                    />
                    <MapView
                        style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        region={this.state.region}
                        showsUserLocation={true}
                    />
                </SafeAreaView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(0, 119, 190)',
        alignItems: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        height: 150,
        marginTop: 400
    },
})

