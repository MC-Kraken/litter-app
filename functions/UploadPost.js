import RNFetchBlob from 'react-native-fetch-blob';
import { db, storage } from '../config';
import { Platform } from 'react-native';
// import { getConsoleOutput } from '@jest/console';

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
const Fetch = RNFetchBlob.polyfill.Fetch
// replace built-in fetch
window.fetch = new Fetch({
    // enable this option so that the response data conversion handled automatically
    auto : true,
    // when receiving response data, the module will match its Content-Type header
    // with strings in this array. If it contains any one of string in this array, 
    // the response body will be considered as binary data and the data will be stored
    // in file system instead of in memory.
    // By default, it only store response data to file system when Content-Type 
    // contains string `application/octet`.
    binaryContentTypes : [
        'image/',
        'video/',
        'audio/',
        'foo/',
    ]
}).build()


export const uploadPost = (uri, postData, mime = 'application/octet-stream') => {
    console.log(uri);
    return(dispatch => {
        return new Promise((resolve, reject) => {
            const uploadUri = Platform.OS === 'ios' ? uri.replace('file://','') : uri
            const sessionId = new Date().getTime()
            let uploadBlob = null

            const imageRef = storage.ref('photos').child(uri)

            fs.readFile(uploadUri, 'base64')
            .then((data) => {
                return Blob.build(data, {type: `${mime};BASE64`})
            })
            .then((blob) => {
                uploadBlob = blob
                return imageRef.put(blob, { contentType: mime })
            })
            // .then(() => {
            //     let downUrl = imageRef.getDownloadURL()
            //     uploadBlob.close()
            //     return downUrl
            // })
            // .then((url) => {
            //     resolve(url)
            //     console.log(url);
            //     storeReference(url, sessionId, postData)
            // })
            .catch((error) => {
                reject(error)
            })
        })
    })
}

const storeReference=(downloadUrl, sessionId, postData) => {

    // fetch('https://trash-app-api.herokuapp.com/CreatePost', {
    //     method: 'POST',
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         Description: postData.Description,
    //         Coordinates: postData.Coordinates,
    //         Title: postData.Title,
    //         Image: downloadUrl,
    //         TimePosted: sessionId
    //     }),
    // }).then((response) => response.json())
    //     .then((responseJson) => {
    //         return responseJson;
    //     })
    //     .then((responseJson) => {
    //         console.log(responseJson)
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });










    let imageRef = storage.ref('photos').child(uri)
    // let currentUser = firebase.auth.currentUser
    let image = {
        type: 'image',
        url: downloadUrl,
        createdAt: sessionId,
        // user: {
        //     id: currentUser.uid,
        //     email: currentUser.email
        // }
    }
    db.ref('posts').push({
        Image: imageRef,
        Imageobj: image,
        Status: Pending,
        Imgcomplete:na,
        Imgcompleteobj:na,
        Description:na,
        Location:na,
        TimeSpent:na,
        AfterDescription:na
    })
}