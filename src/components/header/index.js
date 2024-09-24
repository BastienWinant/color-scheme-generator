import './style.css'

import { onAuthStateChanged, signOut } from 'firebase/auth'

import(/* webpackPrefetch: true */ 'Components/auth')

import { auth } from 'Src/app'
import { openLoginModal, openSignupModal } from 'Components/auth'

const navLoginBtn = document.querySelector('#nav-login-btn')
const navSignupBtn = document.querySelector('#nav-signup-btn')
const navLogoutBtn = document.querySelector('#nav-logout-btn')

const logOut = async () => {
  signOut(auth)
}

navLoginBtn.addEventListener('click', openLoginModal)
navSignupBtn.addEventListener('click', openSignupModal)
navLogoutBtn.addEventListener('click', logOut)

const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log(user)
    } else {

    }
  })
}
monitorAuthState()