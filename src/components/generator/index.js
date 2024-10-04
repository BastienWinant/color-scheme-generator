import './style.css'

import(/* webpackPreload: true */ 'Components/generator/form')
import(/* webpackPreload: true */ 'Components/generator/display')

import { initializeColorScheme, updateColorScheme, getSchemeBtn, collapseCreatePane } from 'Components/generator/form'
import { updateDisplay, showDisplayError } from 'Components/generator/display'

getSchemeBtn.addEventListener('click', async e => {
  e.preventDefault()

  // fetch new color scheme data from the API
  const colorSchemeObj = await updateColorScheme()
  
  // render the JSON data in the DOM
  if (colorSchemeObj) {
    updateDisplay(colorSchemeObj)
    collapseCreatePane()
  } else {
    showDisplayError()
  }
})

export const initializeDisplay = async () => {
  // get a color scheme from localStorage or the API
  const colorSchemeObj = await initializeColorScheme()
  
  // render the color scheme data in the DOM
  if (colorSchemeObj) {
    updateDisplay(colorSchemeObj)
    collapseCreatePane()
  } else {
    showDisplayError()
  }
}