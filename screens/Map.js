import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { ButtonGroup } from 'react-native-elements';

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
      },
      trashMarkers: []
    };
  }

  getItems = async () => {
    try {
      let response = await fetch('https://trash-app-api.herokuapp.com/Posts', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      let res = await response.json();
      if (!res) {
        console.log('Nope');
      } else {
        console.log(res);
        this.setState({
          trashMarkers: res,
        })
      }
    } catch (error) {
      console.log('Something went wrong');
    }
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
    this.getItems();
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
          >
            {
              this.state.trashMarkers.map((p, i) => {
                return (
                  <Marker
                    key={i}
                    coordinate={p.Coordinates}
                    title={p.Title}
                    description={p.Description}
                  />
                )
              })
            }
          </MapView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',

  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
  }
});
