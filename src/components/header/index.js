import './index.css'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'Src/app'
import { openLoginModal, openSignupModal, logOut } from 'Components/auth'

const nav = document.querySelector('#nav')
const navBtns = document.querySelector('#nav-btns')
const navLoginBtn = document.querySelector('#nav-login-btn')
const navSignupBtn = document.querySelector('#nav-signup-btn')
const navLogoutBtn = document.querySelector('#nav-logout-btn')

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

navLoginBtn.addEventListener('click', openLoginModal)
navSignupBtn.addEventListener('click', openSignupModal)
navLogoutBtn.addEventListener('click', logOut)

document.addEventListener('click', e => {
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

const showAuthState = (user) => {
  if (user) {
    navLoginBtn.style.display = 'none'
    navSignupBtn.style.display = 'none'
    navLogoutBtn.style.display = 'block'
  } else {
    navLoginBtn.style.display = 'block'
    navSignupBtn.style.display = 'block'
    navLogoutBtn.style.display = 'none'
  }
}

const monitorAuthState = async () => {
  onAuthStateChanged(auth, showAuthState)
}

monitorAuthState()