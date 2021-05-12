import firebase from 'firebase/app'
import { notification } from 'ant-design-vue'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyAyjOhlwmruqMfyck8oamktn0aNPCihHC0",
  authDomain: "achilio-dev.firebaseapp.com",
  databaseURL: "https://achilio-dev-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "achilio-dev",
  storageBucket: "achilio-dev.appspot.com",
  messagingSenderId: "293325499254",
  appId: "1:293325499254:web:ff3edcf3c1884cdc532857",
  measurementId: "G-66Q3KQ4KXB",
};

firebase.initializeApp(firebaseConfig)
export const firebaseAuth = firebase.auth()
export const firebaseDatabase = firebase.database()

export async function login(email, password) {
  const provider = new firebase.auth.GoogleAuthProvider()
  console.log(firebaseAuth)
  provider.addScope("email")
  provider.addScope("profile")
  provider.addScope("https://www.googleapis.com/auth/bigquery")
  provider.addScope("https://www.googleapis.com/auth/cloudplatformprojects.readonly")
  return firebaseAuth
    .signInWithPopup(provider)
    .then((result) => {
      console.log(result)
      console.log(result.credential.accessToken)
      console.log(result.credential.idToken)
      console.log(currentAccount())
      return true
    })
    .catch(error => {
      notification.warning({
        message: error.code,
        description: error.message,
      })
    })
}

export async function register(email, password, name) {
  return firebaseAuth
    .createUserWithEmailAndPassword(email, password)
    .then(response => {
      if (response.user) {
        const { uid } = response.user
        firebaseDatabase
          .ref('users')
          .child(uid)
          .set({
            role: 'admin',
            name,
          })
      }
      return true
    })
    .catch(error => {
      console.log(error)
      notification.warning({
        message: error.code,
        description: error.message,
      })
    })
}

export async function currentAccount() {
  function getCurrentUser(auth) {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged(user => {
        resolve({
          id: user.uid,
          name: user.displayName,
          role: 'admin',
          email: user.email,
          avatar: user.photoURL,
        })
      }, reject)
    })
  }
  return getCurrentUser(firebaseAuth)
}

export async function logout() {
  return firebaseAuth.signOut().then(() => true)
}
