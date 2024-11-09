import './index.css'
import { onAuthStateChanged } from 'firebase/auth'
import(/* webpackPrefetch: true */ './form')
import(/* webpackPrefetch: true */ './display')
import { auth } from 'Src/app'
import { getSchemeBtn, requestColorScheme, getRandomScheme, fillFormInputs } from './form'
import { displayColorScheme } from './display'

getSchemeBtn.addEventListener('click', async (e) => {
  e.preventDefault()

  // get a new color scheme from the API
  const schemeObj = await requestColorScheme()
  
  if (schemeObj) {
    localStorage.setItem('csg-scheme', JSON.stringify(schemeObj))
    displayColorScheme(schemeObj)
  } else {
    // TODO: display error message
    // displayErrorMessage
  }
})

const initializeDisplay = async () => {

  onAuthStateChanged(auth, async () => {
    // retrieve a scheme object from local storage or get a new random scheme
    let schemeObj = JSON.parse(localStorage.getItem('csg-scheme')) || await getRandomScheme()

    // fill in the form inputs explicitely
    const seed = schemeObj.seed.hex.value
    const mode = schemeObj.mode
    const count = schemeObj.count
    fillFormInputs(seed, mode, count)

    // render the color scheme
    localStorage.setItem('csg-scheme', JSON.stringify(schemeObj))
    displayColorScheme(schemeObj)
  })
}
initializeDisplay()