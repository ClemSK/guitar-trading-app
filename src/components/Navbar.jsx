import React from 'react'
import { Link } from 'react-router-dom'

import SignIn from '../auth/SignIn'
import SignOut from '../auth/SignOut'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <SignIn />
      <SignOut />
      <ul className='navbar-nav'>
        <Link to='/'>
          <li className='nav-link'>Home</li>
        </Link>
        <Link to='/postguitar'>
          <li className='nav-link'>Post a guitar</li>
        </Link>
        <Link to='/userprofile'>
          <li className='nav-link'>My Profile</li>
        </Link>
      </ul>
    </nav>
  )
}

export default Navbar
