import React, { useEffect, useState } from 'react'
import { firebaseConfig } from '../firebase'
import { initializeApp } from 'firebase/app'

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  getFirestore,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  orderBy
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

//initialize firebase
initializeApp(firebaseConfig)
const db = getFirestore()
const auth = getAuth()

// collection refs
const userColRef = collection(db, 'users')
const guitarsColRef = collection(db, 'guitars')

const guitarQuery = query(guitarsColRef, orderBy('createdAt'))
const usersQuery = query(userColRef)

const CreateGuitar = () => {
  const [userCred, setUserCred] = useState({})
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [rrp, setRrp] = useState(0)
  const [lastGuitarId, setLastGuitarId] = useState([])

  // let lastId = []

  useEffect(() => {
    let guitars = []
    let users = []
    setUserCred(auth.currentUser)
    onSnapshot(guitarQuery, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        guitars.push({ ...doc.data(), id: doc.id })
      })
      setLastGuitarId(guitars.slice(-1)[0].id)
      console.log('guitars id', guitars)
    })
    onSnapshot(usersQuery, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id })
      })
      console.log('users id', users)
    })
  }, [])

  // ! find a way not to get doc id without hard-coding

  const userDocRef = doc(db, 'users', 'QJHTof1azjTnovIuhryA')

  const handleGuitarFormSubmit = (e) => {
    e.preventDefault()
    const guitarFormData = {
      brand,
      model,
      rrp
    }
    addDoc(guitarsColRef, {
      brand: guitarFormData.brand,
      model: guitarFormData.model,
      rrp: guitarFormData.rrp,
      isAvailableForTrade: true,
      createdBy: auth.currentUser.uid,
      createdAt: serverTimestamp()
    }).then(() => {
      setBrand('')
      setModel('')
      setRrp(0)
      console.log('new guitar added to db 🤖')
      updateDoc(userDocRef, {
        //! want to add new id to array of ids, not overwrite
        guitarsPosted: lastGuitarId
      })
    })
  }

  return (
    <div>
      <h1>Create a guitar page</h1>
      <h3>Add a guitar</h3>
      <form>
        <label htmlFor='brand'>Brand:</label>
        <input
          type='text'
          name='brand'
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
        />
        <label htmlFor='model'>Model:</label>
        <input
          type='text'
          name='model'
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        />
        <label htmlFor='rrp'>RRP:</label>
        <input
          type='text'
          name='rrp'
          value={rrp}
          onChange={(e) => setRrp(e.target.value)}
          required
        />
        <button onClick={handleGuitarFormSubmit}>
          add a new guitar open for trade
        </button>
      </form>
    </div>
  )
}

export default CreateGuitar
