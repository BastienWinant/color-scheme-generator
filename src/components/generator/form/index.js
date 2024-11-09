import './index.css'
import { ref, child, push, update, set } from 'firebase/database'
import { auth, db } from 'Src/app'
import { openLoginModal } from 'Components/auth'

const generatorColorInput = document.querySelector('#generator-color-input')
const generatorDropdownBtn = document.querySelector('#generator-dropdown-btn')
const generatorModeInputs = document.querySelectorAll('input[name="mode"]')
const generatorColorCount = document.querySelector('#generator-count')
const decreaseCountBtn = document.querySelector('#decrease-count-btn')
const increaseCountBtn = document.querySelector('#increase-count-btn')
export const getSchemeBtn = document.querySelector('#get-scheme-btn')
const saveSchemeBtn = document.querySelector('#save-scheme-btn')

export const fillFormInputs = (color, mode, count) => {
  generatorColorInput.value = color

  generatorDropdownBtn.innerText = mode
  generatorDropdownBtn.value = mode
  for (const modeInput of generatorModeInputs) {
    if (modeInput.value === mode) {
      modeInput.checked = true
      break
    }
  }

  generatorColorCount.innerText = count
  generatorColorCount.dataset.value = count
}

const gatherFormInputs = () => {
  const seedColor = generatorColorInput.value
  const schemeMode = generatorDropdownBtn.value
  const schemeCount = generatorColorCount.innerText

  return [seedColor, schemeMode, schemeCount]
}

const getColorScheme = async (hex, mode, count) => {
  const baseUrl = 'https://www.thecolorapi.com'
  const endPoint = 'scheme'

  const requestUrl = `${baseUrl}/${endPoint}?hex=${hex.slice(1,)}&mode=${mode}&count=${count}`

  try {
    const response = await fetch(requestUrl)
    const data = response.json()

    return data
  } catch {
    return
  }
}

export const requestColorScheme = async () => {
  const [color, mode, count] = gatherFormInputs()
  const schemeObj = await getColorScheme(color, mode, count)

  return schemeObj
}

generatorModeInputs.forEach(inputEl => {
  inputEl.addEventListener('click', e => {
    const mode = e.target.value
    generatorDropdownBtn.innerText = mode
    generatorDropdownBtn.value = mode

  })
})

decreaseCountBtn.addEventListener('click', () => {
  const currentCount = parseInt(generatorColorCount.dataset.value)
  const newCount = currentCount - 1

  generatorColorCount.dataset.value = newCount
  generatorColorCount.innerText = newCount

  increaseCountBtn.disabled = false
  if (newCount === 1) {
    decreaseCountBtn.disabled = true
  }
})

increaseCountBtn.addEventListener('click', () => {
  const currentCount = parseInt(generatorColorCount.dataset.value)
  const newCount = currentCount + 1

  generatorColorCount.dataset.value = newCount
  generatorColorCount.innerText = newCount

  decreaseCountBtn.disabled = false
  if (newCount === 6) {
    increaseCountBtn.disabled = true
  }
})

export function writeNewScheme(uid, schemeObj) {
  // Get a key for a new Scheme.
  const newSchemeKey = push(child(ref(db), 'schemes')).key

  // Write the new scheme's data in the user's scheme list.
  const userSchemeRef = child(ref(db), `/user-schemes/${uid}/${newSchemeKey}`)
  return set(userSchemeRef, schemeObj)
}

saveSchemeBtn.addEventListener('click', () => {
  const currentUser = auth.currentUser
  const schemeObj = JSON.parse(localStorage.getItem('csg-scheme'))
  
  if (currentUser && schemeObj) {
    const userId = currentUser.uid
    writeNewScheme(userId, schemeObj)
  } else {
    openLoginModal()
  }
})

const getRandomSeed = () => {
  const randomSeed = Math.floor(Math.random() * 16777216).toString(16).padEnd(6, 0)
  return `#${randomSeed}`
}

const getRandomMode = () => {
  const randomIndex = Math.floor(Math.random() * generatorModeInputs.length)
  const randomMode = generatorModeInputs[randomIndex].value
  return randomMode
}

const getRandomCount = () => {
  const randomCount = Math.ceil(Math.random() * 6)
  return randomCount
}

export const getRandomScheme = async () => {
  const seed = getRandomSeed()
  const mode = getRandomMode()
  const count = getRandomCount()

  const randomSchemeObj = await getColorScheme(seed, mode, count)
  
  return randomSchemeObj
}