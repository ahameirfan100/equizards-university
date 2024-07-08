// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDWBAk9sUwjs6Psw12v-7c26ba2kkoLLt4",
    authDomain: "signup-authentication-ca98e.firebaseapp.com",
    projectId: "signup-authentication-ca98e",
    storageBucket: "signup-authentication-ca98e.appspot.com",
    messagingSenderId: "925232595234",
    appId: "1:925232595234:web:db9e5273fc0df4e6eba57b",
    measurementId: "G-879F9H7P5G"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
const auth = firebase.auth();
