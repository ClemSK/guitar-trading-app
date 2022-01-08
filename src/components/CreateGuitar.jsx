import React, { useEffect, useState } from 'react'
import { firebaseConfig } from '../firebase'
import { initializeApp } from 'firebase/app'

import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

//initialize firebase
initializeApp(firebaseConfig)
const db = getFirestore()
const auth = getAuth()

// collection refs
const userColRef = collection(db, 'users')
const guitarsColRef = collection(db, 'guitars')

const CreateGuitar = () => {
  const [userCred, setUserCred] = useState({})
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [rrp, setRrp] = useState(0)

  useEffect(() => {
    setUserCred(auth.currentUser)
  }, [])

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
      createdBy: auth.currentUser.uid
    }).then(() => {
      setBrand('')
      setModel('')
      setRrp(0)
      console.log('new guitar added to db 🤖')
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
