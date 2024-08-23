import './style.css'

import { onAuthStateChanged } from "firebase/auth"

import { firebaseAuth } from './app'

async function monitorAuthStatus() {
  onAuthStateChanged(firebaseAuth, user => {
    if (user) {
      console.log("logged in!")
    } else {
      console.log("logged out!")
    }
  })
}

monitorAuthStatus()