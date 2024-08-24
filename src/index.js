import './style.css'

import { onAuthStateChanged } from "firebase/auth"

import { firebaseAuth } from './app'
import { showLoginState } from './components/header'

async function monitorAuthStatus() {
  onAuthStateChanged(firebaseAuth, user => {
    showLoginState(user)
  })
}

monitorAuthStatus()