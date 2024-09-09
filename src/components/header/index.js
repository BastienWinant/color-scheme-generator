import './style.css'

import { openLoginModal, openSignupModal } from '../auth'

const header = document.querySelector('#header')
const navContainer = document.querySelector('#nav-container')
const navAuthContainer = document.querySelector('#nav-auth-container')

function expandNav() {
  navContainer.classList.add('nav-expanded')
}

function collapseNav() {
  navContainer.classList.remove('nav-expanded')
}

function expandNavAuth() {
  navAuthContainer.classList.add('nav-auth-expanded')
}

function collapseNavAuth() {
  navAuthContainer.classList.remove('nav-auth-expanded')
}

header.addEventListener('click', e => {
  if (e.target.closest('#nav-expand-btn')) {
    expandNav()
  } else if (!e.target.closest('#nav')) {
    collapseNav()
  } else if (e.target.closest('#nav-auth-expand-btn')) {
    expandNavAuth()
  } else if (!e.target.closest('#nav-btns')) {
    collapseNavAuth()
  } else if (e.target.id === "nav-login-btn") {
    collapseNav()
    collapseNavAuth()
    openLoginModal()
  } else if (e.target.id === "nav-signup-btn") {
    collapseNav()
    collapseNavAuth()
    openSignupModal()
  }
})

window.addEventListener('resize', () => {
  collapseNav()
  collapseNavAuth()
})

console.log("this is the header")