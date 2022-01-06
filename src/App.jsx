import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './firebase'

import Home from './components/Home'
import SignIn from './auth/SignIn'

import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import SignOut from './auth/SignOut'

// init firebase app
initializeApp(firebaseConfig)
// init services
const auth = getAuth()

function App() {
  const [user] = useAuthState(auth)
  return (
    <div className='App'>
      <h1>Guitar Trading App</h1>
      <SignOut />
      <section>{user ? <Home /> : <SignIn />}</section>
    </div>
  )
}

export default App
