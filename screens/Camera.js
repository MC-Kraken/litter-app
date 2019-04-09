import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, CameraRoll, PermissionsAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { FAB } from 'react-native-paper';

export default class Camera extends Component {
  constructor(props) {
    super(props)
    this.requestStoragePermission = this.requestStoragePermission.bind(this)
  }

  static navigationOptions = {
    title: 'Camera',
    headerLeft: ''
  };

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
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  componentDidMount() {
    this.requestStoragePermission()
  }

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
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'Trashtag needs your permission to use your camera'}
          captureAudio={false}
          fixOrientation={false}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        >
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>

            <FAB
              style={styles.fab}
              icon='camera'
              onPress={this.takePicture.bind(this)} />
          </View>
        </RNCamera>
      </View>
    );
  }

  takePicture = async function () {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options)
      CameraRoll.saveToCameraRoll(data.uri)
      console.log(data.uri)

    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    marginBottom: 16,
    bottom: 0,
    alignSelf: 'center',
    backgroundColor: '#10C135'
  },
});