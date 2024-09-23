import 'Src/style.css'
import './style.css'

import(/* webpackPrefetch: true */ 'Components/auth')

import { openLoginModal, openSignupModal } from 'Components/auth'

const navToggler = document.querySelector('#nav-toggler')
const nav = document.querySelector('#nav')
const navBtnsToggler = document.querySelector('#nav-btns-toggler')
const navBtns = document.querySelector('#nav-btns')
const navLoginBtn = document.querySelector('#nav-login-btn')
const navSignupBtn = document.querySelector('#nav-signup-btn')

navLoginBtn.addEventListener('click', openLoginModal)
navSignupBtn.addEventListener('click', openSignupModal)

// NAV RESPONSIVENESS
const collapseNav = () => {
  nav.classList.remove('nav-expanded')
}

const toggleNav = () => {
  nav.classList.toggle('nav-expanded')
}
navToggler.addEventListener('click', toggleNav)

const collapseNavBtns = () => {
  navBtns.classList.toggle('nav-expanded')
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

console.log('this is the header')