import RNFetchBlob from 'react-native-fetch-blob';
import { db, storage } from '../config'

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob


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
    let currentUser = firebase.auth.currentUser
    let image = {
        type: 'image',
        url: downloadUrl,
        createdAt: sessionId,
        user: {
            id: currentUser.uid,
            email: currentUser.email
        }
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