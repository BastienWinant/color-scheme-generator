import './style.css'

import { onAuthStateChanged } from "firebase/auth"

import { firebaseAuth } from './app'
import { openLoginModal, logOut } from './components/user-auth/login'
import { openSignupModal } from './components/user-auth/signup'
import { headerNav, showLoginState } from './components/header'
import { colorInput, modeInput, modeOptions, submitBtn } from './components/color-scheme-generator/form'
import { updateDisplay } from './components/color-scheme-generator/display'

const modals = document.querySelectorAll('dialog')

// HEADER
headerNav.addEventListener('click', e => {
  if (e.target.id == 'nav-login-btn') {
    openLoginModal()
  } else if (e.target.id == 'nav-signup-btn') {
    openSignupModal()
  } else if (e.target.id == 'nav-logout-btn') {
    logOut()
  }
})

// COLOR SCHEME GENERATOR FORM
submitBtn.addEventListener('click', e => {
  e.preventDefault()

  const color = colorInput.value.slice(1,)
  localStorage.setItem('gcs-color-hex', color)
  
  const mode = modeInput.value
  localStorage.setItem('gcs-color-mode', mode)

  const count = countInput.value
  localStorage.setItem('gcs-color-count', count)

  updateDisplay()
})

// COLOR SCHEME GENERATOR DISPLAY
// assign random values the form inputs
function initializeDisplay() {
  const randomHex = Math.floor(Math.random() * 16777216).toString(16).padEnd(6, '0')
  colorInput.value = `#${randomHex}`
  localStorage.setItem('gcs-color-hex', randomHex)

  const randomMode = modeOptions[Math.floor(Math.random() * modeOptions.length)].value
  modeInput.value = randomMode
  localStorage.setItem('gcs-color-mode', randomMode)

  updateDisplay()
}

// USER AUTHENTICATION STATUS
async function monitorAuthStatus() {
  onAuthStateChanged(firebaseAuth, user => {
    showLoginState(user)
  })
}

modals.forEach(modal => {
  modal.addEventListener('click', e => {
    if (!e.target.closest('.modal-inner')) {
      modal.close()
    }
  })
})

monitorAuthStatus()
initializeDisplay()