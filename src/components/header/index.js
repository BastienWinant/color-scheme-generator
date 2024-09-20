import 'Src/style.css'
import './style.css'

import(/* webpackPrefetch: true */ 'Components/auth/index.js')

import { signOut, onAuthStateChanged } from 'firebase/auth'

import { auth } from 'Src/app'
import { openLoginModal, openSignupModal } from 'Components/auth'

const navLoginBtn = document.querySelector('#nav-login-btn')
const navSignupBtn = document.querySelector('#nav-signup-btn')
const navLogoutBtn = document.querySelector('#nav-logout-btn')

const logOut = async () => {
  signOut(auth)
}

const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      navLoginBtn.style.display = 'none'
      navSignupBtn.style.display = 'none'
      navLogoutBtn.style.display = 'block'
    } else {
      navLoginBtn.style.display = 'block'
      navSignupBtn.style.display = 'block'
      navLogoutBtn.style.display = 'none'
    }
  })
}

navLoginBtn.addEventListener('click', openLoginModal)
navSignupBtn.addEventListener('click', openSignupModal)
navLogoutBtn.addEventListener('click', logOut)

monitorAuthState()