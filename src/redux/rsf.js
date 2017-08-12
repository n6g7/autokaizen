import firebase from 'firebase'
import ReduxSagaFirebase from 'redux-saga-firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDtaB4XLml-NjNxwQ_04d7rYx_UptQUfmE',
  authDomain: 'autokaizen-b153e.firebaseapp.com',
  databaseURL: 'https://autokaizen-b153e.firebaseio.com',
  projectId: 'autokaizen-b153e',
  storageBucket: 'autokaizen-b153e.appspot.com',
  messagingSenderId: '879071603246'
})

const rsf = new ReduxSagaFirebase(firebaseApp)

export const authProvider = new firebase.auth.GoogleAuthProvider()

export default rsf
