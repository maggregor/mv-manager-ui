import firebase from 'firebase/app'
import { notification } from 'ant-design-vue'
import 'firebase/auth'
import 'firebase/database'
import store from '@/store'

const firebaseConfig = {
  apiKey: "AIzaSyAyjOhlwmruqMfyck8oamktn0aNPCihHC0",
  authDomain: "achilio-dev.firebaseapp.com",
  databaseURL: "https://achilio-dev.europe-west1.firebasedatabase.app",
  projectId: "achilio-dev",
  storageBucket: "achilio-dev.appspot.com",
  messagingSenderId: "293325499254",
  appId: "1:293325499254:web:ff3edcf3c1884cdc532857",
  measurementId: "G-66Q3KQ4KXB",
};

firebase.initializeApp(firebaseConfig)
export const firebaseAuth = firebase.auth()
export const firebaseDatabase = firebase.database()
/** Provider configuration */
const provider = new firebase.auth.GoogleAuthProvider()
const allScopes = [
  'email',
  'profile',
  'https://www.googleapis.com/auth/bigquery',
  'https://www.googleapis.com/auth/cloudplatformprojects.readonly',
]
allScopes.forEach(scope => provider.addScope(scope))

export async function login() {
  return firebaseAuth
    .signInWithPopup(provider)
    .then((result) => {
      let user = result.user
      let refreshToken = user.refreshToken
      let accessToken = result.credential.accessToken
      let ref = firebaseDatabase.ref(`/users/${user.uid}`)
      ref.on("value", function(snapshot) {
        store.commit('user/SET_USER', snapshot.val())
      })
      ref.set({
        id: user.uid,
        email: user.email,
        avatar: user.photoURL,
        name: user.displayName,
        refreshToken: refreshToken, 
        accessToken: accessToken,
      })
      return true
    })
    .catch(error => {
      console.error(error)
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
        if (user) {
          if (store.getters['user/user'].id === '') {
            let ref = firebaseDatabase.ref(`/users/${user.uid}`)
            ref.once("value").then(snapshot => {
              store.commit('user/SET_USER', snapshot.val())
              resolve(store.getters['user/user'])
            })
          } else {
            resolve(store.getters['user/user'])
          }
        } else {
          resolve(null)
        }
      }, reject)
    })
  }
  return getCurrentUser(firebaseAuth)
}

export async function logout() {
  return firebaseAuth.signOut().then(() => true)
}
