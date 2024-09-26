import { onAuthStateChanged } from 'firebase/auth'

import(/* webpackPrefetch: true */ 'Src/app')
import(/* webpackPreload: true */ 'Components/header')
import(/* webpackPreload: true */ 'Components/generator')

import { auth } from 'Src/app'
import { showAuthState } from 'Components/header'
import { initializeDisplay } from 'Components/generator'

const monitorAuthState = () => {
  onAuthStateChanged(auth, user => {
    showAuthState(user)
    initializeDisplay()
  })
}
monitorAuthState()