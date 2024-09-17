import './style.css'

import {
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

import(/* webpackPrefetch: true */ 'Components/auth/index')

import { auth, db } from 'Src/app'

const logOut = async () => {
  signOut(auth)
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