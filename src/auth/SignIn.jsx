import React from 'react'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../firebase'

import {
  getAdditionalUserInfo,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp
} from 'firebase/firestore'

initializeApp(firebaseConfig)

// refs
const db = getFirestore()
const auth = getAuth()
const userColRef = collection(db, 'users')

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken

        // check if this is the users first sign in, if it is then create a new user doc to be referenced later, if it isnt, just sign and add no extra data
        const details = getAdditionalUserInfo(result)
        if (details.isNewUser) {
          addDoc(userColRef, {
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName,
            photoURL: auth.currentUser.photoURL,
            email: auth.currentUser.email,
            guitarsPosted: ['guitar 1', 'guitar 2']
          })
        }
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return (
    <div className='signin-container'>
      <button onClick={signInWithGoogle}>sign in with google</button>
    </div>
  )
}

export default SignIn
