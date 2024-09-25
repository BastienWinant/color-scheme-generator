import './style.css'

import { onAuthStateChanged } from 'firebase/auth'

import(/* webpackPrefetch: true */ 'Components/auth')

import { auth } from 'Src/app'
import { openSignupModal, openLoginModal, logOut } from 'Components/auth'

const navSignupBtn = document.querySelector('#nav-signup-btn')
const navLoginBtn = document.querySelector('#nav-login-btn')
const navLogoutBtn = document.querySelector('#nav-logout-btn')

navSignupBtn.addEventListener('click', openSignupModal)
navLoginBtn.addEventListener('click', openLoginModal)
navLogoutBtn.addEventListener('click', logOut)

const monitorAuthState = () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log(user)
    } else {
      console.log('Logged out!')
    }
  })
}
monitorAuthState()