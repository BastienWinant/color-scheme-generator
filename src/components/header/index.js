import './style.css'

import(/* webpackPrefetch: true */ 'Components/auth')

import { openSignupModal, openLoginModal, logOut } from 'Components/auth'

const nav = document.querySelector('#nav')
const navBtns = document.querySelector('#nav-btns')

const collapseNav = () => {
  nav.classList.remove('nav-expanded')
}

const toggleNav = () => {
  nav.classList.toggle('nav-expanded')
}

const collapseNavBtns = () => {
  navBtns.classList.remove('nav-btns-expanded')
}

const toggleNavBtns = () => {
  navBtns.classList.toggle('nav-btns-expanded')
}

navBtns.addEventListener('click', e => {
  if (e.target.id === 'nav-signup-btn') {
    openSignupModal()
  } else if (e.target.id === 'nav-login-btn') {
    openLoginModal()
  } else if (e.target.id === 'nav-logout-btn') {
    logOut()
  }
})

window.addEventListener('click', e => {
  console.log()
  if (e.target.closest('.nav-toggler')) {
    toggleNav()
  } else if (e.target.closest('.nav-btns-toggler')) {
    toggleNavBtns()
  } else {
    collapseNav()
    collapseNavBtns()
  }
})

window.addEventListener('resize', () => {
  collapseNav()
  collapseNavBtns()
})

export const showAuthState = (user) => {
  if (user) {
    navBtns.innerHTML = `
      <button type="button" id="nav-logout-btn" class="nav-btn">log out</button>`
  } else {
    navBtns.innerHTML = `
      <button type="button" id="nav-login-btn" class="nav-btn">log in</button>
      <button type="button" id="nav-signup-btn" class="nav-btn nav-signup-btn">sign up</button>`
  }
}