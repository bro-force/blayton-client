import firebase from 'firebase'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "blayton-47621.firebaseapp.com",
  databaseURL: "https://blayton-47621.firebaseio.com",
  projectId: "blayton-47621",
  storageBucket: "blayton-47621.appspot.com",
  messagingSenderId: "822469417276"
}

firebase.initializeApp(config)

export default firebase

export const database = firebase.database()

export const githubProvider = new firebase.auth.GithubAuthProvider()
githubProvider.addScope('user')
