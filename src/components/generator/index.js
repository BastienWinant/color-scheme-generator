import(/* webpackPreload: true */ './form')
import(/* webpackPreload: true */ './display')

import { initializeColorScheme, updateColorScheme, getSchemeBtn } from './form'
import { updateDisplay } from './display'

export const initializeDisplay = async () => {
  const colorSchemeObj = await initializeColorScheme()
  
  if (colorSchemeObj) {
    updateDisplay(colorSchemeObj)
  }
}

getSchemeBtn.addEventListener('click', async e => {
  e.preventDefault()

  const colorSchemeObj = await updateColorScheme()
  
  if (colorSchemeObj) {
    updateDisplay(colorSchemeObj)
  }
})