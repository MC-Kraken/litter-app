import React from 'react';
import { View } from 'react-native';
import { Card, Text, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function HomeTrash(props) {

    // const { id, location, description, image } = props.trashPost;

    return (
        <>
            <Card
                containerStyle={{ backgroundColor: 'rgb(0, 119, 190)', borderRadius: 10, borderColor: '#ADD8EF', width: '98%', marginTop: 5 }}
                title='Hoover, AL'
                titleStyle={{ color: '#ffffff' }}
                image={require('../assets/trashExample.jpg')}>
                <Text style={{ marginBottom: 10, textAlign: 'center', color: '#ffffff' }}>
                    Belk parking lot at the Riverchase Galleria
                </Text>
                <View style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        icon={<Icon name='calendar-check' color='#ffffff' style={{ paddingRight: 10 }} />}
                        containerStyle={{ width: 150 }}
                        buttonStyle={{ borderRadius: 10, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#10C135' }}
                        title='Pledge' />
                </View>
            </Card>
        </>
    )
}