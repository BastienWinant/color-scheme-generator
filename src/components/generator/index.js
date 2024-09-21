import './style.css'

import { ref, child, push, update } from "firebase/database"

import { auth, db } from 'Src/app'
import { openLoginModal } from 'Components/auth'

import {
  colorInput,
  dropdownBtn,
  dropdownOptions,
  getSchemeBtn,
  saveSchemeBtn,
  selectDropdownOption,
  getColorScheme
} from './form'

import { renderSchemeDisplay } from './display'

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

function writeNewScheme(uid, schemeData) {
  // Get a key for a new Scheme.
  const newSchemeKey = push(child(ref(db), 'schemes')).key

  // Write the new scheme's data simultaneously in the schemes list and the user's scheme list.
  const updates = {};
  updates['/schemes/' + newSchemeKey] = schemeData
  updates['/user-schemes/' + uid + '/' + newSchemeKey] = schemeData

  return update(ref(db), updates)
}
saveSchemeBtn.addEventListener('click', () => {  
  if (auth.currentUser) {
    const colorSchemeObj = JSON.parse(localStorage.getItem('csg-scheme'))
    const userId = auth.currentUser.uid

    writeNewScheme(userId, colorSchemeObj)
  } else {
    openLoginModal()
  }
})

dropdownOptions.forEach(radioInput => {
  radioInput.addEventListener('click', selectDropdownOption)
})
selectDropdownOption()
initializeDisplay()