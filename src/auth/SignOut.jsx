import React from 'react'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../firebase'

import { getAuth, signOut } from 'firebase/auth'

initializeApp(firebaseConfig)

const auth = getAuth()

const SignOut = () => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('signout successful')
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return (
    auth.currentUser && <button onClick={handleSignOut}>sign out</button>
  )
}

export default SignOut
