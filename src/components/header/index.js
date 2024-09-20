import 'Src/style.css'
import './style.css'

import(/* webpackPrefetch: true */ 'Components/auth/index.js')

import { openLoginModal, openSignupModal, logOut } from 'Components/auth'

const navLoginBtn = document.querySelector('#nav-login-btn')
const navSignupBtn = document.querySelector('#nav-signup-btn')
const navLogoutBtn = document.querySelector('#nav-logout-btn')

navLoginBtn.addEventListener('click', openLoginModal)
navSignupBtn.addEventListener('click', openSignupModal)
navLogoutBtn.addEventListener('click', logOut)