importScripts("https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.3.0/firebase-messaging.js");


firebase.initializeApp({
  apiKey: "AIzaSyBakKir9Hb_iinf9kYR3oW6K4i4AXm_X9I",
  authDomain: "eoffice-4803f.firebaseapp.com",
  projectId: "eoffice-4803f",
  storageBucket: "eoffice-4803f.appspot.com",
  messagingSenderId: "101882101334",
  appId: "1:101882101334:web:8fc4bf659633ed01e9c5f7",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.registration.showNotification(notificationTitle,
    notificationOptions);
});