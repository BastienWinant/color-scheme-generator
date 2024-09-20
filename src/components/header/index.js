import './style.css'

import(/* webpackPrefetch: true */ 'Components/auth/index.js')

import { openLoginModal, openSignupModal } from 'Components/auth'

const navLoginBtn = document.querySelector('#nav-login-btn')
const navSignupBtn = document.querySelector('#nav-signup-btn')

navLoginBtn.addEventListener('click', openLoginModal)
navSignupBtn.addEventListener('click', openSignupModal)