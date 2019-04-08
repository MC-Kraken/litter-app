import React, { Component } from 'react';
import {
    ImageBackground,
    StyleSheet,
    TextInput,
    Text,
    SafeAreaView,
} from 'react-native';
import { Button } from 'react-native-elements';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            error: ""
          }
        this.emailInput = React.createRef();
    }

    render() {
        return (
            <ImageBackground
                style={styles.bgImg}
                source={require('../assets/recycle.png')}
                >
                <SafeAreaView style={styles.container}>
                    <Text style={styles.textTop}>trashtag</Text>
                    <Text style={{ color: 'white' }}>{this.state.error}</Text>
                    <TextInput
                        onChangeText={(email) => this.setState({ email })}
                        returnKeyType="next"
                        onSubmitEditing={() => { this.emailInput.current.focus(); }}
                        keyboardType="email-address"
                        placeholder='Email'
                        autoCapitalize= 'none'
                        style={styles.form}>
                    </TextInput>
                    <TextInput
                        onChangeText={(password) => this.setState({ password })}
                        ref={this.emailInput}
                        keyboardType="default"
                        secureTextEntry
                        placeholder='Password'
                        autoCapitalize= 'none'
                        style={styles.form}>
                    </TextInput>
                    <Button 
                        buttonStyle={{ width: 200, height: 40, marginTop: 40, backgroundColor: 'transparent', borderColor: 'white', borderWidth: 1, borderRadius: 20 }}
                        title="Login"
                        // onPress={ this.userLogin }
                        onPress= {() => this.props.navigation.navigate('Home')}
                        containerViewStyle={{ borderColor: 'white' }}
                        rounded={ true }
                        type="outline"
                        titleStyle={{ color: 'white' }}
                    />
                    <Button 
                        buttonStyle={{ width: 200, height: 40, marginTop: 10, backgroundColor: 'transparent', borderColor: 'white', borderWidth: 1, borderRadius: 20 }}
                        title="Register"
                        onPress={ () => this.props.navigation.navigate('Register') }
                        containerViewStyle={{ borderColor: 'white' }}
                        rounded={ true }
                        type="outline"
                        titleStyle={{ color: 'white' }}
                    />
                </SafeAreaView>
            </ImageBackground >
        )
    }
}

const styles = StyleSheet.create({
    textTop: {
        fontSize: 40,
        color: 'white',
        position: 'absolute',
        top: 5,
    },
    bgImg: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(0, 119, 190)'
    },
    form: {
        height: 40,
        backgroundColor: 'white',
        opacity: .8,
        borderColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        marginTop: 10,
        width: 200
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
