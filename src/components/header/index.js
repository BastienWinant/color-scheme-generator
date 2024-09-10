import './style.css'

import { onAuthStateChanged } from 'firebase/auth'

import { auth } from '../../app'
import { openLoginModal, openSignupModal, logOut } from '../auth'

const header = document.querySelector('#header')
const navContainer = document.querySelector('#nav-container')
const navAuthContainer = document.querySelector('#nav-auth-container')
const navBtns = document.querySelector('#nav-btns')

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
  } else if (e.target.id === "nav-logout-btn") {
    collapseNav()
    collapseNavAuth()
    logOut()
  }
})

window.addEventListener('resize', () => {
  collapseNav()
  collapseNavAuth()
})

function showLoginState(user) {
  if (user) {
    navBtns.innerHTML = `
      <li><button type="button" id="nav-logout-btn" class="nav-btn nav-logout-btn">log out</button></li>`
  } else {
    navBtns.innerHTML = `
      <li><button type="button" id="nav-login-btn" class="nav-btn">log in</button></li>
      <li><button type="button" id="nav-signup-btn" class="nav-btn nav-signup-btn">sign up</button></li>`
  }
}

async function monitorAuthState() {
  onAuthStateChanged(auth, showLoginState)
}
monitorAuthState()