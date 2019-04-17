import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import  MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
  });
};

export default class Map extends Component {
  static navigationOptions = {
    title: 'Trash Map'
  }

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 33.543682,
        longitude: -86.779633,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }
    };
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
      <View style={{ flex: 1, backgroundColor: 'rgb(0, 119, 190)', justifyContent: 'center' }}>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            region={this.state.region}
            showsUserLocation={true}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
    
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: '90%',
  }
});
