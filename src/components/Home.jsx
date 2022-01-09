import React, { useState, useEffect } from 'react'
import { firebaseConfig } from '../firebase'

import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

initializeApp(firebaseConfig)

// refs
const db = getFirestore()
const auth = getAuth()
const userColRef = collection(db, 'users')

const q = query(userColRef, orderBy('createdAt'))

const Home = () => {
  return (
    <>
      <h1>Welcome! View all guitars here</h1>
    </>
  )
}

export default Home
