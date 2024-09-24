import 'Src/style.css'
import './style.css'

import(/* webpackPrefetch: true */ 'Components/auth')

import { signOut, onAuthStateChanged } from 'firebase/auth'

import { auth } from 'Src/app'
import { openLoginModal, openSignupModal } from 'Components/auth'

const navToggler = document.querySelector('#nav-toggler')
const nav = document.querySelector('#nav')
const navBtnsToggler = document.querySelector('#nav-btns-toggler')
const navBtns = document.querySelector('#nav-btns')
const navLoginBtn = document.querySelector('#nav-login-btn')
const navSignupBtn = document.querySelector('#nav-signup-btn')
const navLogoutBtn = document.querySelector('#nav-logout-btn')

const logOut = async () => {
  signOut(auth)
}

navLoginBtn.addEventListener('click', openLoginModal)
navSignupBtn.addEventListener('click', openSignupModal)
navLogoutBtn.addEventListener('click', logOut)

// NAV RESPONSIVENESS
const collapseNav = () => {
  nav.classList.remove('nav-expanded')
}

const toggleNav = () => {
  nav.classList.toggle('nav-expanded')
}
navToggler.addEventListener('click', toggleNav)

const collapseNavBtns = () => {
  navBtns.classList.remove('nav-expanded')
}

const toggleNavBtns = () => {
  navBtns.classList.toggle('nav-expanded')
}
navBtnsToggler.addEventListener('click', toggleNavBtns)

window.addEventListener('click', e => {
  if (!e.target.closest('#nav-toggler')) {
    collapseNav()
  }
  
  if (!e.target.closest('#nav-btns-toggler')) {
    collapseNavBtns()
  }
})

window.addEventListener('resize', () => {
  collapseNav()
  collapseNavBtns()
})

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
monitorAuthState()