import './style.css'

import(/* webpackPrefetch: true */ 'Components/auth')

import { openSignupModal } from 'Components/auth'

const navSignupBtn = document.querySelector('#nav-signup-btn')

navSignupBtn.addEventListener('click', openSignupModal)