import './index.css'
import { onAuthStateChanged } from 'firebase/auth'
import(/* webpackPrefetch: true */ './form')
import(/* webpackPrefetch: true */ './display')
import { auth } from 'Src/app'
import { getSchemeBtn, requestColorScheme, getRandomScheme, fillFormInputs } from './form'
import { displayColorScheme } from './display'

getSchemeBtn.addEventListener('click', async (e) => {
  e.preventDefault()

  const schemeObj = await requestColorScheme()
  
  if (schemeObj) {
    localStorage.setItem('csg-scheme', JSON.stringify(schemeObj))
    displayColorScheme(schemeObj)
  }
})

const initializeDisplay = async () => {

  onAuthStateChanged(auth, async () => {
    let schemeObj = JSON.parse(localStorage.getItem('csg-scheme')) || await getRandomScheme()

    const seed = schemeObj.seed.hex.value
    const mode = schemeObj.mode
    const count = schemeObj.count

    fillFormInputs(seed, mode, count)
    localStorage.setItem('csg', JSON.stringify(schemeObj))
    displayColorScheme(schemeObj)
  })
}
initializeDisplay()