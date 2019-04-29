import { db, storage } from '../config';

export default async function getImage(uri) {
    // console.log("URI: ", uri)
    let imgString = uri
    let imageRef = storage.ref('photos').child(imgString);
    // console.log("Image Ref: ", imageRef)
    await imageRef.getDownloadURL()
        .then((url) => {

            // urlreturn = url;
            console.log("URL RETURN: ", url)
            return url
        }).catch(function (error) {
            // Handle any errors
        });

}