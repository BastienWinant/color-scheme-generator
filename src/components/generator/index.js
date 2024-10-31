import './index.css'
import(/* webpackPrefetch: true */ './form')
import(/* webpackPrefetch: true */ './display')
import { getSchemeBtn, requestColorScheme, getRandomScheme } from './form'
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
  const schemeObj = await getRandomScheme()
  localStorage.setItem('csg', JSON.stringify(schemeObj))
  displayColorScheme(schemeObj)
}
initializeDisplay()