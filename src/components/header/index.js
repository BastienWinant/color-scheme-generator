import './index.css'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'Src/app'
import { openLoginModal, openSignupModal, logOut } from 'Components/auth'

const navToggler = document.querySelector('#nav-toggler')
const nav = document.querySelector('#nav')
const navLoginBtn = document.querySelector('#nav-login-btn')
const navSignupBtn = document.querySelector('#nav-signup-btn')
const navLogoutBtn = document.querySelector('#nav-logout-btn')

const toggleNav = () => {
  nav.classList.toggle('nav-expanded')
}
navToggler.addEventListener('click', toggleNav)

navLoginBtn.addEventListener('click', openLoginModal)
navSignupBtn.addEventListener('click', openSignupModal)
navLogoutBtn.addEventListener('click', logOut)

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