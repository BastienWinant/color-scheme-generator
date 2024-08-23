import './style.css'

import { openLoginModal, logOut } from '../userAuth/login'
import { openSignupModal } from '../userAuth/signup'

const navLoginBtn = document.querySelector('#nav-login-btn')
const navSignupBtn = document.querySelector('#nav-signup-btn')
const navLogoutBtn = document.querySelector('#nav-logout-btn')

navLoginBtn.addEventListener('click', openLoginModal)
navSignupBtn.addEventListener('click', openSignupModal)
navLogoutBtn.addEventListener('click', logOut)