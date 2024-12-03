import './index.css'
import { onAuthStateChanged } from 'firebase/auth'
import(/* webpackPrefetch: true */ './form')
import(/* webpackPrefetch: true */ './display')
import { auth } from 'Src/app'
import { getSchemeBtn, requestColorScheme, getRandomScheme,
  fillFormInputs, countDecreaseBtn, countIncreaseBtn, collapseGeneratorForm } from './form'
import { displayColorScheme, displayErrorMessage } from './display'

getSchemeBtn.addEventListener('click', async (e) => {
  // get a new color scheme from the API
  const schemeObj = await requestColorScheme()
  
  // save the scheme object to localstorage
  if (schemeObj) {
    localStorage.setItem('csg-scheme', JSON.stringify(schemeObj))
    displayColorScheme(schemeObj)
  } else {
    displayErrorMessage()
  }

  collapseGeneratorForm()
})

const initializeDisplay = async () => {

  onAuthStateChanged(auth, async () => {
    // retrieve a scheme object from local storage or get a new random scheme
    // const schemeObj = JSON.parse(localStorage.getItem('csg-scheme')) || await getRandomScheme()
    const schemeObj = await getRandomScheme()

    if (schemeObj) {
      // fill in the form inputs explicitely
      const seed = schemeObj.seed.hex.value
      const mode = schemeObj.mode
      const count = schemeObj.count
      fillFormInputs(seed, mode, count)

      if (count == 1) countDecreaseBtn.disabled = true
      else if (count == 5) countIncreaseBtn.disabled = true

      // render the color scheme
      localStorage.setItem('csg-scheme', JSON.stringify(schemeObj))
      displayColorScheme(schemeObj)
    } else {
      displayErrorMessage()
    }
  })
}
initializeDisplay()