import './style.css'

import { signOut } from 'firebase/auth'

import(/* webpackPrefetch: true */ 'Components/auth');

import { auth } from 'Src/app'
import { openLoginModal, openSignupModal } from 'Components/auth'

const navLoginBtn = document.querySelector('#nav-login-btn')
const navSignupBtn = document.querySelector('#nav-signup-btn')
const navLogoutBtn = document.querySelector('#nav-logout-btn')

navLoginBtn.addEventListener('click', openLoginModal)
navSignupBtn.addEventListener('click', openSignupModal)

const logOut = () => {
  signOut(auth)
}
navLogoutBtn.addEventListener('click', logOut)