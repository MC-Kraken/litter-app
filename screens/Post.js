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
            Image: 'Placeholder',
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

    async componentDidMount() {
        const { navigation } = this.props;
        const Title = navigation.dangerouslyGetParent().getParam('Title', 'Trouble loading title')
        const Description = navigation.dangerouslyGetParent().getParam('Description', 'Trouble loading description')
        const Image = navigation.dangerouslyGetParent().getParam('Image', 'Trouble loading image')
        const region = navigation.dangerouslyGetParent().getParam('Coordinates', 'Trouble loading coordinates')
        this.setState({ Title, Description, Image, region })
    }

    render() {
        return (
            <>
                <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <SafeAreaView style={styles.container}>
                        <Image
                            style={styles.image} source={{ uri: this.state.Image }}
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
                            >
                                <View style={{ height: 50, width: 50 }}>
                                    <Image
                                        source={require('../assets/garbage.png')}
                                        style={{ height: 30, width: 30 }}
                                    />
                                </View>
                            </Marker>
                        </MapView>
                        <View
                            style={styles.divider2}>
                        </View>
                        <Text style={styles.name}>{this.state.Title}</Text>
                        <Text style={styles.description}>{this.state.Description}</Text>
                        <Button
                            // onPress={() => { this.props.navigation.navigate('Post', { Title: p.Title, Description: p.Description, Coordinates: p.Coordinates }); this.props.navigation.dispatch(resetActionPost) }}
                            icon={<Icon name='calendar-check' color='white' style={{ paddingRight: 10 }} />}
                            containerStyle={{ width: 150, borderColor: 'white', borderWidth: 2, marginTop: 20 }}
                            buttonStyle={{ borderRadius: 10, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#10C135' }}
                            title='Pledge'
                            titleStyle={{ color: 'white' }}
                        />
                        <Button
                            onPress={() => this.props.navigation.navigate('CompletePost', { Image: this.state.Image, Description: this.state.Description, Title: this.state.Title })}
                            icon={<Icon name='check' color='#10C135' style={{ paddingRight: 10 }} />}
                            containerStyle={{ width: 150, borderColor: '#10C135', borderWidth: 2, marginTop: 20, marginBottom: 20 }}
                            buttonStyle={{ borderRadius: 10, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: 'white' }}
                            title='Complete'
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
        marginRight: 10,
        marginLeft: 10
    }
})

