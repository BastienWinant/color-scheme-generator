import 'Src/style.css'
import './style.css'

import {
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

import(/* webpackPrefetch: true */ 'Components/auth/index')

import { auth, db } from 'Src/app'

const nav = document.querySelector('#nav')
const navBtns = document.querySelector('#nav-btns')

const loginModal = document.querySelector('#login-modal')
const signupModal = document.querySelector('#signup-modal')

const openLoginModal = () => {
  loginModal.showModal()
}

const openSignupModal = () => {
  signupModal.showModal()
}

nav.addEventListener('click', e => {
  if (e.target.id === 'nav-login-btn') {
    openLoginModal()
  } else if (e.target.id === 'nav-signup-btn') {
    openSignupModal()
  }
})

const toggleNav = () => {
  nav.classList.toggle('nav-expanded')
}

const collapseNav = () => {
  nav.classList.remove('nav-expanded')
}

const toggleNavAuth = () => {
  navBtns.classList.toggle('nav-expanded')
}

const collapseNavAuth = () => {
  navBtns.classList.remove('nav-expanded')
}

window.addEventListener('click', e => {
  if (e.target.closest('#nav-toggler')) {
    toggleNav()
  } else if (e.target.closest('#nav-auth-toggler')) {
    toggleNavAuth()
  } else {
    collapseNav()
    collapseNavAuth()
  }
})

window.addEventListener('resize', () => {
  collapseNav()
  collapseNavAuth()
})

const logOut = async () => {
  await signOut(auth)
}

const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      // TODO: show logout btn
    } else {
      // TODO: show auth btns
    }
  })
}
monitorAuthState()