import './style.css'

import { ref, child, push, update } from "firebase/database"

import { auth, db } from 'Src/app'
import { openLoginModal } from 'Components/auth'

const generatorDisplay = document.querySelector('#generator-display')
const colorInput = document.querySelector('#color')
const dropdownBtn = document.querySelector('#dropdown-btn')
const dropdownBtnText = document.querySelector('#dropdown-btn span')
const dropdownOptions = document.querySelectorAll('input[name="mode"]')
const getSchemeBtn = document.querySelector('#get-scheme-btn')

const newSchemeBtn = document.querySelector('#new-scheme-btn')
const saveSchemeBtn = document.querySelector('#save-scheme-btn')

const selectDropdownOption = () => {
  const optionValue = document.querySelector('input[name="mode"]:checked').value
    
  dropdownBtn.value = optionValue
  dropdownBtnText.textContent = optionValue
}
dropdownOptions.forEach(radioInput => {
  radioInput.addEventListener('click', selectDropdownOption)
})
selectDropdownOption()

const getColorScheme = async (color, mode) => {
  const baseUrl = 'https://www.thecolorapi.com'
  const endpoint = 'scheme'

  const requestUrl = `${baseUrl}/${endpoint}?hex=${color}&mode=${mode}&count=5`

  try {
    const res = await fetch(requestUrl)
    const data = await res.json()
    return data
  } catch (error) {
    return
  }
}

const getSchemeDislayHTML = (colorSchemeObj) => {
  const liEls = colorSchemeObj.colors.map(colorObj => {
    const liEl = document.createElement('li')
    liEl.classList.add('generator-display-color')

    liEl.style.backgroundColor = colorObj.hex.value

    liEl.innerHTML = `${colorObj.name.value}`
    return liEl
  })

  return liEls
}

const renderSchemeDisplay = async (colorSchemeObj) => {
  generatorDisplay.innerHTML = ''
  localStorage.setItem('csg-scheme', JSON.stringify(colorSchemeObj))
  const colorsHTML = getSchemeDislayHTML(colorSchemeObj)
  generatorDisplay.append(...colorsHTML)
}

getSchemeBtn.addEventListener('click', async (e) => {
  e.preventDefault()

  const color = colorInput.value.slice(1,)
  const mode = dropdownBtn.value

  const colorSchemeObj = await getColorScheme(color, mode)

  if (colorSchemeObj) renderSchemeDisplay(colorSchemeObj)
})

const initializeDisplay = async () => {
  // check for a saved color scheme in localStorage
  let colorSchemeObj = JSON.parse(localStorage.getItem('csg-scheme'))

  if (colorSchemeObj) {
    const mode = colorSchemeObj.mode
    const color = colorSchemeObj.seed.hex.value

    colorInput.value = color

    Object.values(dropdownOptions).find(radioInput => radioInput.value === mode).checked = true
    selectDropdownOption()
  } else {
    const randomHex = Math.floor(Math.random() * 16777216).toString(16).padEnd(6, '0')
    colorInput.value = `#${randomHex}`

    const randomIndex = Math.floor(Math.random() * dropdownOptions.length)
    dropdownOptions[randomIndex].checked = true
    selectDropdownOption()

    const mode = dropdownBtn.value

    colorSchemeObj = await getColorScheme(randomHex, mode)
  }

  if (colorSchemeObj) renderSchemeDisplay(colorSchemeObj)
}
initializeDisplay()

function writeNewScheme(uid, schemeData) {
  // Get a key for a new Scheme.
  const newSchemeKey = push(child(ref(db), 'schemes')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/schemes/' + newSchemeKey] = schemeData;
  updates['/user-schemes/' + uid + '/' + newSchemeKey] = schemeData;

  return update(ref(db), updates);
}
saveSchemeBtn.addEventListener('click', () => {
  const colorSchemeObj = JSON.parse(localStorage.getItem('csg-scheme'))
  
  if (auth.currentUser) {
    const colorSchemeObj = JSON.parse(localStorage.getItem('csg-scheme'))
    const userId = auth.currentUser.uid

    writeNewScheme(userId, colorSchemeObj)
  } else {
    openLoginModal()
  }
})