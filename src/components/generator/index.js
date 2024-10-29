import './index.css'
import { getSchemeBtn, requestColorScheme } from './form'
import { displayColorScheme } from './display'

getSchemeBtn.addEventListener('click', async (e) => {
  e.preventDefault()

  const schemeObj = await requestColorScheme()
  
  if (schemeObj) {
    localStorage.setItem('csg-scheme', JSON.stringify(schemeObj))
    displayColorScheme(schemeObj)
  }
})
