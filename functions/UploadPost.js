import RNFetchBlob from 'react-native-fetch-blob';
import { db, storage } from '../config';
import { Platform } from 'react-native';

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
            .then(() => {
                uploadBlob.close()
                return imageRef.getDownloadURL()
            })
            .then((url) => {
                resolve(url)
                storeReference(url, sessionId, postData)
            })
            .catch((error) => {
                reject(error)
            })
        })
    })
}

const storeReference=(downloadUrl, sessionId, postData) => {
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
    let post = {
        Image: imageRef,
        Imageobj: image,
        Status: "Pending",
        Imgcomplete:"",
        Imgcompleteobj:"",
        Description:"",
        Location:"",
        TimeSpent:"",
        AfterDescription:""
    }
    db.ref('posts').push(post)
}