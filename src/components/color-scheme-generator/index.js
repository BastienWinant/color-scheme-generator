import './style.css'

import { colorInput, modeInput, modeInputText, modeOptions } from './form'
import { colorsUl, createColorElements } from './display'
import { getSelectedFormat, saveSchemeBtn } from './dashboard'

export function updateDisplay() {
  // request param values were previously set through from submission
  const colorHex = localStorage.getItem('gcs-color-hex') || '808080'
  const colorMode = localStorage.getItem('gcs-color-mode') || 'monochrome'
  const colorFormat = localStorage.getItem('gcs-color-format') || 'hex'
  
  // build the full request url
  const baseURL = "https://www.thecolorapi.com"
  const endpoint = "scheme"
  const requestURL = `${baseURL}/${endpoint}?hex=${colorHex}&mode=${colorMode}`

  // use the api data to fill the ul colors container
  fetch(requestURL)
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('gcs-scheme', JSON.stringify(data))
      colorsUl.innerHTML = ''
      const colorLis = createColorElements(data.colors, colorFormat)
      colorsUl.append(...colorLis)
    })

    saveSchemeBtn.innerHTML = '<i class="fa-regular fa-bookmark fa-lg"></i>'
}

// assign random values the form inputs
export function initializeDisplay() {
  const randomHex = Math.floor(Math.random() * 16777216).toString(16).padEnd(6, '0')
  colorInput.value = `#${randomHex}`
  localStorage.setItem('gcs-color-hex', randomHex)

  const randomMode = modeOptions[Math.floor(Math.random() * modeOptions.length)]
  randomMode.checked = true
  modeInput.value = randomMode.value
  modeInputText.innerText = randomMode.value
  localStorage.setItem('gcs-color-mode', randomMode.value)

  const format = getSelectedFormat()
  localStorage.setItem('gcs-color-format', format)

  updateDisplay()
}