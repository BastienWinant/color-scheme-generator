import 'Src/style.css'
import './style.css'

import(/* webpackPrefetch: true */ 'Components/auth')

import { signOut, onAuthStateChanged } from 'firebase/auth'

import { auth } from 'Src/app'
import { openLoginModal, openSignupModal } from 'Components/auth'

const navExpandBtn = document.querySelector('#nav-expand-btn')
const nav = document.querySelector('#nav')
const headerExpandBtn = document.querySelector('#header-auth-expand-btn')
const authBtns = document.querySelector('#header-auth-btns')

const navLoginBtn = document.querySelector('#nav-login-btn')
const navSignupBtn = document.querySelector('#nav-signup-btn')
const navLogoutBtn = document.querySelector('#nav-logout-btn')

const collapseNav = () => {
  nav.classList.remove('nav-expanded')
}

const toggleNav = () => {
  nav.classList.toggle('nav-expanded')
}
navExpandBtn.addEventListener('click', toggleNav)

const collapseNavAuth = () => {
  authBtns.classList.remove('header-auth-expanded')
}

const toggleNavAuth = () => {
  authBtns.classList.toggle('header-auth-expanded')
}
headerExpandBtn.addEventListener('click', toggleNavAuth)

window.addEventListener('resize', () => {
  collapseNav()
  collapseNavAuth()
})

window.addEventListener('click', e => {
  console.lo
  if (!(e.target.closest('#nav') || e.target.closest('#nav-expand-btn'))) {
    collapseNav()
    collapseNavAuth()
  }
})

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