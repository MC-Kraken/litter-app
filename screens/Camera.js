import React, { Component } from 'react';
import { StyleSheet, View, CameraRoll, PermissionsAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { FAB } from 'react-native-paper';


export default class Camera extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
    this.requestStoragePermission = this.requestStoragePermission.bind(this);
    this.requestCameraPermission = this.requestCameraPermission.bind(this);
    this.takePicture = this.takePicture.bind(this);
  };

  static navigationOptions = {
    title: 'Camera',
    headerLeft: ''
  };

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true, fixOrientation: true, pauseAfterCapture: true};
      const data = await this.camera.takePictureAsync(options);
      CameraRoll.saveToCameraRoll(data.uri);
      console.log(data.uri)
      setTimeout(() => this.props.navigation.navigate('CreatePost', {uri: data.uri}), 1500); 
    };
  };

  handlePress() {
    this.takePicture()   
  }

  async requestStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Trashtag Storage Permission',
          message:
            'Trashtag needs access to your storage ' +
            'so you can save your photos.',
          buttonPositive: 'Ok',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can save photos');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    };
  };

  async requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Trashtag Camera Permission',
          message:
            'Trashtag needs access to your camera ' +
            'so you can take photos.',
          buttonPositive: 'Ok',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    };
  };

  componentDidMount() {
    this.requestStoragePermission()
    this.requestCameraPermission()
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.auto}
          captureAudio={false}
        >
          <View style={styles.square}></View>
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <FAB
              style={styles.fab}
              icon='camera'
              onPress={this.handlePress} />
          </View>
        </RNCamera>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  fab: {
    position: 'absolute',
    marginBottom: 16,
    bottom: 0,
    alignSelf: 'center',
    backgroundColor: '#10C135'
  },
  square: {
    height: 200,
    width: 200,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: '55%'
  }
});