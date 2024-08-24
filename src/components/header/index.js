import './style.css'

import { openLoginModal, logOut } from '../user-auth/login'
import { openSignupModal } from '../user-auth/signup'

const nav = document.querySelector('#nav')

nav.addEventListener('click', e => {
  if (e.target.id == 'nav-login-btn') {
    openLoginModal()
  } else if (e.target.id == 'nav-signup-btn') {
    openSignupModal()
  } else if (e.target.id == 'nav-logout-btn') {
    logOut()
  }
})

export function showLoginState(user) {
  if (user) {
    nav.innerHTML = `
      <button type="button" id="nav-logout-btn">log out</button>`
  } else {
    nav.innerHTML = `
      <button type="button" id="nav-login-btn">log in</button>
      <button type="button" id="nav-signup-btn">sign up</button>`
  }
}