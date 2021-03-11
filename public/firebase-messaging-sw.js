importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyBakKir9Hb_iinf9kYR3oW6K4i4AXm_X9I",
    authDomain: "eoffice-4803f.firebaseapp.com",
    projectId: "eoffice-4803f",
    storageBucket: "eoffice-4803f.appspot.com",
    messagingSenderId: "101882101334",
    appId: "1:101882101334:web:8fc4bf659633ed01e9c5f7"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    const promiseChain = clients
      .matchAll({
        type: "window",
        includeUncontrolled: true
      })
      .then(windowClients => {
        for (let i = 0; i < windowClients.length; i++) {
          const windowClient = windowClients[i];
          windowClient.postMessage(payload);
        }
      })
      .then(() => {
        return registration.showNotification("my notification title");
      });
    return promiseChain;
  });
  
  self.addEventListener('notificationclick', function(event) {
    // do what you want
    // ...
  });