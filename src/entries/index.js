import { onAuthStateChanged } from 'firebase/auth'

import(/* webpackPrefetch: true */ 'Src/app')
import(/* webpackPreload: true */ 'Components/header')
import(/* webpackPreload: true */ 'Components/generator/form')
import(/* webpackPreload: true */ 'Components/generator/display')

import { auth } from 'Src/app'
import { showAuthState } from 'Components/header'
import { initializeColorScheme, updateColorScheme, getSchemeBtn } from 'Components/generator/form'
import { updateDisplay } from 'Components/generator/display'

getSchemeBtn.addEventListener('click', async e => {
  e.preventDefault()

  const colorSchemeObj = await updateColorScheme()
  
  if (colorSchemeObj) {
    updateDisplay(colorSchemeObj)
  }
})

const initializeDisplay = async () => {
  // get a color scheme from localStorage or the API
  const colorSchemeObj = await initializeColorScheme()
  
  // render the color scheme data in the DOM
  if (colorSchemeObj) {
    updateDisplay(colorSchemeObj)
  }
}

const monitorAuthState = () => {
  onAuthStateChanged(auth, user => {
    showAuthState(user)
    initializeDisplay()
  })
}
monitorAuthState()