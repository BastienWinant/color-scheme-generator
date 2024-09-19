import 'Src/style.css'
import './style.css'

const generatorForm = document.querySelector('#generator-form')
const colorInput = document.querySelector('#color')
const modeInput = document.querySelector('#mode')
const getSchemeBtn = document.querySelector('#get-scheme-btn')
const newSchemeBtn = document.querySelector('#new-scheme-btn')
const saveSchemeBtn = document.querySelector('#save-scheme-btn')

const generatorDisplay = document.querySelector('#generator-display')

const renderSchemeHTML = (liArr) => {
  generatorDisplay.innerHTML = ''
  generatorDisplay.append(...liArr)
}

const generateSchemeHTML = (colorsArr) => {
  return colorsArr.map(colorObj => {
    const liEl = document.createElement('li')
    liEl.classList.add('generator-color', 'black-border')

    liEl.innerHTML = `${colorObj.name.value}`

    return liEl
  })
}

const getColorScheme = async (hex, mode) => {
  const baseUrl = 'https://www.thecolorapi.com'
  const endpoint = 'scheme'

  const requestUrl = `${baseUrl}/${endpoint}?hex=${hex}&mode=${mode}`
  
  try {
    const res = await fetch(requestUrl)
    const data = await res.json()

    return data
  } catch (error) {
    return
  }
}

const updateColorScheme = async (hex, mode) => {
  const colorSchemeObj = await getColorScheme(hex, mode)
  
  if (colorSchemeObj) {
    localStorage.setItem('gcs-scheme', colorSchemeObj)
    const generatorDisplayEls = generateSchemeHTML(colorSchemeObj.colors)
    renderSchemeHTML(generatorDisplayEls)
  }
}

getSchemeBtn.addEventListener('click', e => {
  e.preventDefault()

  const color = colorInput.value.slice(1,)
  const mode = modeInput.value

  updateColorScheme(color, mode)
})

const initializeDisplay = async () => {
  const randomHex = Math.floor(Math.random() * 16777216).toString(16)
  colorInput.value = `#${randomHex}`
  console.log(randomHex)

  const modeOptions = document.querySelectorAll('.mode-option')
  const randomModeIndex = Math.floor(Math.random() * modeOptions.length)
  const randomMode = modeOptions[randomModeIndex].value
  // modeInput.value = randomMode

  updateColorScheme(randomHex, randomMode)
}
initializeDisplay()