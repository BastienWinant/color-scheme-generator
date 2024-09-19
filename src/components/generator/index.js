import 'Src/style.css'
import './style.css'

import { ref, child, push, update } from "firebase/database"

import { auth, db } from 'Src/app'
import { openLoginModal } from 'Components/auth/index'

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
  const mode = modeInput.value

  updateColorScheme(color, mode)
})

const initializeDisplay = async () => {
  const randomHex = Math.floor(Math.random() * 16777216).toString(16)
  colorInput.value = `#${randomHex}`

  const modeOptions = document.querySelectorAll('.mode-option')
  const randomModeIndex = Math.floor(Math.random() * modeOptions.length)
  const randomMode = modeOptions[randomModeIndex].value

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