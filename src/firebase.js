import firebase from 'firebase'

firebase.initializeApp({
    apiKey: "AIzaSyDbPDtm9c3Q1UcKvOMRtfwuGoNgOeZBKtY",
    authDomain: "todo-8e882.firebaseapp.com",
    projectId: "todo-8e882",
    storageBucket: "todo-8e882.appspot.com",
    messagingSenderId: "197895972306",
    appId: "1:197895972306:web:5d19860700cd04a28b940b"

})

export const db = firebase.database();

export const auth = firebase.auth();