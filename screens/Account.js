// import React, { Component } from 'react';
// import { Text, SafeAreaView, StyleSheet} from 'react-native';
// import { FAB } from 'react-native-paper';

// export default class Account extends Component {
//     constructor(props){
//         super(props);
//     }
    
//     static navigationOptions = {
//         title: 'Account',
//     };

//     render() {
//         return (
//             <SafeAreaView style={styles.container}>
//                 <Text>Account</Text>
//                 <FAB
//                     style={styles.fab}
//                     icon='camera'
//                     onPress={() => this.props.navigation.navigate('Camera')} />
//             </SafeAreaView>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     fab: {
//         position: 'absolute',
//         margin: 16,
//         right: 0,
//         bottom: 0,
//         backgroundColor: '#10C135'
//     },
//     container: {
//         flex: 1,
//         backgroundColor: 'rgb(0, 119, 190)',
//         justifyContent: 'center',
//         alignItems: 'center'
//     }
// })

import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    AsyncStorage
} from 'react-native';
import {SafeAreaView} from 'react-navigation'
import { Button, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const ACCESS_TOKEN = 'access_token';
const USER_FNAME = 'user_fname';
const USER_LNAME = 'user_lname';
const USER_EMAIL = 'user_email';
const USER_ID = 'user_id';

class Account extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft:
                <Icon
                    name="bars"
                    size={30}
                    style={{ paddingLeft: 10 }}
                    onPress={() => navigation.openDrawer()} />,
            title: "Account"
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            _id: "",
            accessToken: ""
        };
    }

    // componentWillMount() {
    //     this.getToken();
    // }

    // componentDidMount() {
    //     this.getUser();
    // }

    // getUser = async () => {
    //     try {
    //       let _id = await AsyncStorage.getItem(USER_ID);
    //       let response = await fetch(`https://cryptic-crag.herokuapp.com/api/v2/account/${_id}`, {
    //         method: 'GET',
    //         headers: {
    //           Accept: 'application/json',
    //           'Content-Type': 'application/json',
    //           'Authorization': this.state.accessToken
    //         }
    //       });
    //       let res = await response.json();
    //       if (!_id || !res) {
    //         console.log('No user found');
    //       } else {
    //         console.log(res);
    //         this.setState({
    //           firstName: res.firstName, 
    //           lastName: res.lastName, 
    //           email: res.email,
    //           _id: _id})
    //       }
    //     } catch (error) {
    //         console.log('Something went wrong');
    //     }
    // }

    // getToken = async () => {
    //     try {
    //         let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
    //         if (!accessToken) {
    //             console.log('No token found');
    //             this.props.navigation.navigate('Login');
    //         } else {
    //             this.setState({ accessToken });
    //         }
    //     } catch (error) {
    //         console.log('Something went wrong');
    //         this.props.navigation.navigate('Login');
    //     }
    // }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                    <Avatar
                        source={{
                            uri: 'https://pbs.twimg.com/profile_images/939549969958051840/zs3ndSvV_400x400.jpg'
                        }}
                        rounded
                        size={150}
                        containerStyle={{ marginTop: 20, marginLeft: 20 }}
                    />
                    <Text style={styles.name}>
                    {/* {`${this.state.firstName} ${this.state.lastName}`} */}
                    James May
                    </Text>
                    <Text style={styles.status}>Level 1</Text>
                    <Text style={styles.email}>{this.state.email}</Text>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    name: {
        fontSize: 40,
        color: 'black'
    },
    status: {
        fontSize: 30,
        fontStyle: 'italic'
    },
    email: {
        margin: 10
    },
    container: {
        flex: 1,
        alignItems: 'center',
    }
})

export default Account;
