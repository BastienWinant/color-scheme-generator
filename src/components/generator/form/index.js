import 'Src/style.css'
import './style.css'

import { ref, child, push, update } from 'firebase/database'

import { auth, db } from 'Src/app'
import { openLoginModal } from 'Components/auth'

const collapseBtn = document.querySelector('#generator-collapse-btn')
const schemeCreatePane = document.querySelector('#scheme-create-pane')
export const colorInput = document.querySelector('#color')
export const modeDropdownBtn = document.querySelector('#mode-dropdown-btn')
const modeDropdownList = document.querySelector('#mode-dropdown-list')
export const modeOptions = document.querySelectorAll('input[name="mode"]')
export const countDecreaseBtn = document.querySelector('#generator-count-minus')
export const countIncreaseBtn = document.querySelector('#generator-count-plus')
export const generatorCount = document.querySelector('#generator-count')
export const getSchemeBtn = document.querySelector('#get-scheme-btn')

const newSchemeBtn = document.querySelector('#new-scheme-btn')
const saveSchemeBtn = document.querySelector('#save-scheme-btn')

const collapseDropdownList = () => {
  modeDropdownList.classList.remove('dropdown-list-expanded')
}

const toggleDropdownList = () => {
  modeDropdownList.classList.toggle('dropdown-list-expanded')
}
modeDropdownBtn.addEventListener('click', toggleDropdownList)

export const selectDropdownOption = () => {
  const modeValue = document.querySelector('input[name="mode"]:checked').value
  
  modeDropdownBtn.querySelector('.dropdown-btn-text').innerText = modeValue
  modeDropdownBtn.value = modeValue
}
modeOptions.forEach(radioInput => {
  radioInput.addEventListener('click', selectDropdownOption)
})

const decreaseGeneratorCount = () => {
  countIncreaseBtn.disabled = false

  let count = parseInt(generatorCount.dataset.count)
  count = Math.max(0, count - 1)
  generatorCount.dataset.count = count
  generatorCount.innerText = count

  if (count === 0) {
    countDecreaseBtn.disabled = true
  }
}
countDecreaseBtn.addEventListener('click', decreaseGeneratorCount)

const increaseGeneratorCount = () => {
  countDecreaseBtn.disabled = false

  let count = parseInt(generatorCount.dataset.count)
  count = Math.min(5, count + 1)
  generatorCount.dataset.count = count
  generatorCount.innerText = count

  if (count === 5) {
    countIncreaseBtn.disabled = true
  }
}
countIncreaseBtn.addEventListener('click', increaseGeneratorCount)

export const getColorScheme = async (color, mode, count) => {
  const baseUrl = 'https://www.thecolorapi.com'
  const endPoint = 'scheme'

  const requestUrl = `${baseUrl}/${endPoint}?hex=${color}&mode=${mode}&count=${count}`
  
  try {
    const res = await fetch(requestUrl)
    const data = await res.json()

    return data
  } catch (error) {
    return
  }
}

export const collapseGeneratorForm = () => {
  schemeCreatePane.classList.remove('pane-expanded')
}
collapseBtn.addEventListener('click', collapseGeneratorForm)

const expandGeneratorForm = () => {
  schemeCreatePane.classList.add('pane-expanded')
}
newSchemeBtn.addEventListener('click', expandGeneratorForm)

const writeNewScheme = (uid, schemeData) => {
  // Get a key for a new Scheme.
  const newSchemeKey = push(child(ref(db), 'schemes')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {}
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