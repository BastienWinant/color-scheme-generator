import(/* webpackPreload: true */ './form')
import(/* webpackPreload: true */ './display')

import { initializeColorScheme, updateColorScheme, getSchemeBtn } from './form'
import { updateDisplay } from './display'

const initializeDisplay = async () => {
  const colorSchemeObj = await initializeColorScheme()
  
  if (colorSchemeObj) {
    updateDisplay(colorSchemeObj)
  }
}
initializeDisplay()

getSchemeBtn.addEventListener('click', async e => {
  e.preventDefault()

  const colorSchemeObj = await updateColorScheme()
  
  if (colorSchemeObj) {
    updateDisplay(colorSchemeObj)
  }
})