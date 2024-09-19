import 'Src/style.css'
import './style.css'

import { ref, child, push, update } from "firebase/database"

import { auth, db } from 'Src/app'
import { openLoginModal } from 'Components/auth/index'

const colorInput = document.querySelector('#color')
const modeInput = document.querySelector('#mode')
const modeBtn = document.querySelector('#mode-btn')
const modeOptions = document.querySelector('#mode-options')
const modeInputs = document.querySelectorAll('.mode-option')
const getSchemeBtn = document.querySelector('#get-scheme-btn')

const newSchemeBtn = document.querySelector('#new-scheme-btn')
const saveSchemeBtn = document.querySelector('#save-scheme-btn')

const generatorDisplay = document.querySelector('#generator-display')

// collapse the dropdown when clicking outside of it
const collapseModeDropdown = () => {
  modeOptions.classList.remove('mode-options-expanded')
}
window.addEventListener('click', e => {
  if (!(e.target === modeBtn)) collapseModeDropdown()
})

const toggleModeDropdown = () => {
  modeOptions.classList.toggle('mode-options-expanded')
}
modeBtn.addEventListener('click', toggleModeDropdown)

modeInputs.forEach(radioInput => {
  radioInput.addEventListener('click', e => {
    const modeValue = radioInput.value

    modeBtn.innerText = modeValue
    modeBtn.value = modeValue
  })
})

const renderSchemeHTML = (liArr) => {
  generatorDisplay.innerHTML = ''
  generatorDisplay.append(...liArr)
}

const generateSchemeHTML = (colorsArr) => {
  return colorsArr.map(colorObj => {
    const liEl = document.createElement('li')
    liEl.classList.add('generator-color', 'black-border')

    liEl.style.backgroundColor = colorObj.hex.value

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
    localStorage.setItem('csg-scheme', JSON.stringify(colorSchemeObj))
    const generatorDisplayEls = generateSchemeHTML(colorSchemeObj.colors)
    renderSchemeHTML(generatorDisplayEls)
  }
}

getSchemeBtn.addEventListener('click', e => {
  e.preventDefault()

  const color = colorInput.value.slice(1,)
  const mode = modeBtn.value

  updateColorScheme(color, mode)
})

const initializeDisplay = async () => {
  const randomHex = Math.floor(Math.random() * 16777216).toString(16)
  colorInput.value = `#${randomHex}`

  const randomModeIndex = Math.floor(Math.random() * modeInputs.length)
  const randomMode = modeInputs[randomModeIndex].value
  modeBtn.innerText = randomMode
  modeBtn.value = randomMode

  updateColorScheme(randomHex, randomMode)
}
initializeDisplay()

function writeNewScheme(uid, schemeData) {
  // Get a key for a new Scheme.
  const newSchemeKey = push(child(ref(db), 'schemes')).key;

  // Write the new scheme's data simultaneously in the schemes list and the user's scheme list.
  const updates = {};
  updates['/schemes/' + newSchemeKey] = schemeData;
  updates['/user-schemes/' + uid + '/' + newSchemeKey] = schemeData;

  return update(ref(db), updates);
}

saveSchemeBtn.addEventListener('click', () => {
  if (auth.currentUser) {
    const schemeData = JSON.parse(localStorage.getItem('csg-scheme'))

    if (schemeData) {
      const userId = auth.currentUser.uid

      writeNewScheme(userId, schemeData)
    }

  } else {
    openLoginModal()
  }
})