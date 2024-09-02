import './style.css'

import { onAuthStateChanged } from "firebase/auth"
import { ref, child, push, update } from "firebase/database"

import { firebaseAuth, firebaseDB } from './app'
import { openLoginModal, logOut } from './components/user-auth/login'
import { openSignupModal } from './components/user-auth/signup'
import { headerNav, showLoginState } from './components/header'
import { colorInput, modeInput, submitBtn } from './components/color-scheme-generator/form'
import { formatOptions, saveSchemeBtn } from './components/color-scheme-generator/dashboard'
import { updateDisplay, initializeDisplay } from './components/color-scheme-generator/index'

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

  updateDisplay()
})

// COLOR SCHEME GENERATOR DASHBOARD
formatOptions.forEach(radioInput => {
  radioInput.addEventListener('click', e => {    
    updateDisplay()
  })
})

// SAVE COLOR SCHEME FUNCTIONALITY
function saveScheme() {
  const schemeData = JSON.parse(localStorage.getItem('gcs-scheme'))

  if (firebaseAuth.currentUser) {
    // retrieve the logged user ID
    const userId = firebaseAuth.currentUser.uid

    // Get a key for a new scheme
    const newSchemeKey = push(child(ref(firebaseDB), 'schemes')).key

    // Write the new scheme's data simultaneously in the schemes list and the user's scheme list.
    const updates = {}
    updates['/schemes/' + newSchemeKey] = schemeData
    updates['/user-schemes/' + userId + '/' + newSchemeKey] = schemeData

    update(ref(firebaseDB), updates)

    saveSchemeBtn.innerHTML = '<i class="fa-solid fa-bookmark fa-lg"></i>'
  } else {
    openLoginModal()
  }
}
saveSchemeBtn.addEventListener('click', saveScheme)

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