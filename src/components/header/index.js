import './style.css'

import { onAuthStateChanged } from 'firebase/auth'

import(/* webpackPrefetch: true */ 'Components/auth')

import { auth } from 'Src/app'
import { openSignupModal, openLoginModal, logOut } from 'Components/auth'

const navBtns = document.querySelector('#nav-btns')

navBtns.addEventListener('click', e => {
  if (e.target.id === 'nav-signup-btn') {
    openSignupModal()
  } else if (e.target.id === 'nav-login-btn') {
    openLoginModal()
  } else if (e.target.id === 'nav-logout-btn') {
    logOut()
  }
})

const monitorAuthState = () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      navBtns.innerHTML = `
        <button type="button" id="nav-logout-btn" class="nav-btn">log out</button>`
    } else {
      navBtns.innerHTML = `
        <button type="button" id="nav-login-btn" class="nav-btn">log in</button>
        <button type="button" id="nav-signup-btn" class="nav-btn">sign up</button>`
    }
  })
}
monitorAuthState()