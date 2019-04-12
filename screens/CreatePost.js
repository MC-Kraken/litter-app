import React, { Component } from 'react';
import { Text, SafeAreaView, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { uploadPost } from '../functions/UploadPost';
//Pass it the uri, and the postdata object

export default class CreatePost extends Component {
    static navigationOptions = {
        title: 'Create a Post',
    };

    constructor(props) {
        super(props);
        this.state = {
            uri: 'Placeholder',
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        const photoUri = navigation.dangerouslyGetParent().getParam('uri', 'Trouble loading image');
        this.setState({ uri: photoUri })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Image style={{ height: 300, width: "100%" }} source={{ uri: this.state.uri }}/>
                <Button
                    title="Test Upload" 
                    titleStyle={{ color: "white" }}
                    onPress={uploadPost(this.state.uri, {name: ''})}
                    containerStyle={{ width: 200, height: 20, marginTop: 20 }}
                    buttonStyle={{ backgroundColor: "#10C135" }}/>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(0, 119, 190)',
    
        alignItems: 'center'
    }
})

