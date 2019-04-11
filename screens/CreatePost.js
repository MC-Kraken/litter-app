import React, { Component } from 'react';
import { Text, SafeAreaView, StyleSheet, Image } from 'react-native';
import { uploadPost } from '../functions/UploadPost'
//Pass it the uri, and the postdata object

export default class CreatePost extends Component {
    static navigationOptions = {
        title: 'Create a Post',
    };

    constructor(props) {
        super(props);
        this.state = {
            uri: '',
            failed: false
        }
    }

    _onError = () => {
        this.setState({ failed: true });
    }

    componentDidMount() {
        const { navigation } = this.props;
        const photoUri = navigation.dangerouslyGetParent().getParam('uri', 'Trouble loading image');
        this.setState({ uri: photoUri })
    }

    render() {
        const defaultImage = <Image source={require('../assets/recycle.png')} />;
        if (this.state.failed) return defaultImage;

        return (
            <SafeAreaView style={styles.container}>
                <Text>Image Path: {this.state.uri}</Text>
                <Image style={{ height: 200, width: 200 }} source={{ uri: this.state.uri }} onError={this._onError} />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(0, 119, 190)',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

