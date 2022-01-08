import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './firebase'

import Home from './components/Home'
import Navbar from './components/Navbar'
import CreateGuitar from './components/CreateGuitar'
import UserProfile from './components/UserProfile'

import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'

// init firebase app
initializeApp(firebaseConfig)
// init services
const auth = getAuth()

function App() {
  const [user] = useAuthState(auth)
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={
            <div>
              <Home />
            </div>
          }
        />
        <Route
          path='/postguitar'
          element={
            <div>
              <CreateGuitar />
            </div>
          }
        />
        <Route
          path='/userprofile'
          element={
            <div>
              <UserProfile />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
