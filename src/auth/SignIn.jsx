import React from 'react'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../firebase'

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'

initializeApp(firebaseConfig)

const auth = getAuth()

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        // signed in user info
        const user = result.user
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
