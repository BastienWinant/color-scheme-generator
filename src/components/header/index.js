import './style.css'

import {
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

import(/* webpackPrefetch: true */ 'Components/auth/index')

import { auth, db } from 'Src/app'

const header = document.querySelector('#header')
const headerNav = document.querySelector('#nav')
const headerNavBtns = document.querySelector('#nav-btns')

const toggleNav = () => {
  headerNav.classList.toggle('nav-expanded')
}

header.addEventListener('click', e => {
  console.log(e.target)
  if (e.target.closest('#nav-toggler')) {
    toggleNav()
  }
})

const logOut = async () => {
  await signOut(auth)
}

const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      // TODO: show logout btn
    } else {
      // TODO: show auth btns
    }
  })
}
monitorAuthState()