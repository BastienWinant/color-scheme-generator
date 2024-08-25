import './style.css'

import { colorInput, modeInput, modeOptions, countInput, submitBtn } from '../form'

const colorsUl = document.querySelector('#generator-colors')

function createColorElements(colorsArr) {
  return colorsArr.map(colorObj => {
    const liEl = document.createElement('li')
    liEl.classList.add('generator-color')

    liEl.innerHTML = `${colorObj.hex.value}`

    return liEl
  })
}


function updateDisplay() {
  const colorHex = localStorage.getItem('gcs-color-hex')
  const colorMode = localStorage.getItem('gcs-color-mode')
  const colorCount = localStorage.getItem('gcs-color-count')
  
  const baseURL = "https://www.thecolorapi.com"
  const endpoint = "scheme"
  const requestURL = `${baseURL}/${endpoint}?hex=${colorHex}&mode=${colorMode}&count=${colorCount}`

  fetch(requestURL)
    .then(response => response.json())
    .then(data => {
      colorsUl.innerHTML = ''
      const colorLis = createColorElements(data.colors)
      colorsUl.append(...colorLis)
    })
}

submitBtn.addEventListener('click', e => {
  e.preventDefault()

  const color = colorInput.value.slice(1,)
  localStorage.setItem('gcs-color-hex', color)
  
  const mode = modeInput.value
  localStorage.setItem('gcs-color-mode', mode)

  const count = countInput.value
  localStorage.setItem('gcs-color-count', count)

  updateDisplay()
})

function initializeDisplay() {
  const randomHex = Math.floor(Math.random() * 16777216).toString(16).padEnd(6, '0')
  colorInput.value = `#${randomHex}`
  localStorage.setItem('gcs-color-hex', randomHex)

  const randomMode = modeOptions[Math.floor(Math.random() * modeOptions.length)].value
  modeInput.value = randomMode
  localStorage.setItem('gcs-color-mode', randomMode)
}

initializeDisplay()