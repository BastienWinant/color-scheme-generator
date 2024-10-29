import './index.css'
import(/* webpackPrefetch: true */ './form')
import(/* webpackPrefetch: true */ './display')
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
