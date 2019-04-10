
import Firebase from 'firebase';

// Initialize Firebase
let config = {
    apiKey: "************",
    authDomain: "************.firebaseapp.com",
    databaseURL: "https://************.firebaseio.com",
    projectId: "************",
    storageBucket: "************.appspot.com",
    messagingSenderId: "**********"
};
let app = Firebase.initializeApp(config);
export const db = app.database();

/*
db.ref('<Collection Name>').push({
    name: item
  });
*/