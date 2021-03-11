import  firebase from "firebase/app";
import "firebase/messaging";

const initializedFirebaseApp = firebase.initializeApp({
// Project Settings => Add Firebase to your web app
apiKey: "AIzaSyBakKir9Hb_iinf9kYR3oW6K4i4AXm_X9I",
authDomain: "eoffice-4803f.firebaseapp.com",
projectId: "eoffice-4803f",
storageBucket: "eoffice-4803f.appspot.com",
messagingSenderId: "101882101334",
appId: "1:101882101334:web:8fc4bf659633ed01e9c5f7"
});

const messaging = initializedFirebaseApp.messaging();

messaging.usePublicVapidKey(
// Project Settings => Cloud Messaging => Web Push certificates
  "BFSJmpLSlYa_2HpPsg0a1lEJQ4T8eppOKMc2mLQngrrKhnQsNzyJ0Ti7n9_olw8IUAxN1UKO3NUwQnYcc7nX7XA"
);

export { messaging };