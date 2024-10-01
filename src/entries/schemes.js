import 'Src/style.css'

import { onAuthStateChanged } from 'firebase/auth'

import(/* webpackPreload: true */ 'Src/app')
import(/* webpackPreload: true */ 'Components/header')

import { auth } from 'Src/app'
import { showAuthState } from 'Components/header'

const monitorAuthState = () => {
  onAuthStateChanged(auth, async (user) => {
    showAuthState(user)
  })
}
monitorAuthState()