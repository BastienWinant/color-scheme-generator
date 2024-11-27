import './index.css'
import { auth } from 'Src/app'
import { openLoginModal } from 'Components/auth'
import { writeNewScheme } from 'Src/db_utils'

const schemeCreatePane = document.querySelector('#scheme-create-pane')
const formCollapseBtn = document.querySelector('#generator-form-collapse-btn')
const colorInput = document.querySelector('#color')
const modeDropdownBtn = document.querySelector('#mode-dropdown-btn')
const modeDropdownBtnText = document.querySelector('#mode-dropdown-btn-text')
const modeDropdown = document.querySelector('#mode-dropdown-options')
const modeDropdownOptions = document.querySelectorAll('.mode-dropdown-option input[type="radio"]')
const generatorColorCount = document.querySelector('#count')
export const countDecreaseBtn = document.querySelector('#count-decrease-btn')
export const countIncreaseBtn = document.querySelector('#count-increase-btn')
export const getSchemeBtn = document.querySelector('#get-scheme-btn')

const newSchemeBtn = document.querySelector('#new-scheme-btn')
const saveSchemeBtn = document.querySelector('#save-scheme-btn')

// fill the form input fields with fixed values
export const fillFormInputs = (color, mode, count) => {
  colorInput.value = color

  modeDropdownBtnText.innerText = mode
  modeDropdownBtn.value = mode
  for (const modeInput of modeDropdownOptions) {
    if (modeInput.value === mode) {
      modeInput.checked = true
      break
    }
  }

  generatorColorCount.innerText = count
  generatorColorCount.dataset.value = count
}

const gatherFormInputs = () => {
  const seedColor = colorInput.value
  const schemeMode = modeDropdownBtn.value
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

// COLOR MODE
const collapseModeDropdown = () => {
  modeDropdown.classList.remove('dropdown-expanded')
}

const toggleModeDropdown = () => {
  modeDropdown.classList.toggle('dropdown-expanded')
}

modeDropdownOptions.forEach(option => {
  option.addEventListener('click', e => {
    const mode = e.target.value
    
    modeDropdownBtnText.innerText = mode
    modeDropdownBtn.value = mode

    toggleModeDropdown()
  })
})

window.addEventListener('click', e => {
  if (e.target.closest('#mode-dropdown-btn')) toggleModeDropdown()
  else if (!e.target.closest('.mode-dropdown-option')) collapseModeDropdown()
})

// COLOR COUNT
countDecreaseBtn.addEventListener('click', () => {
  const currentCount = parseInt(generatorColorCount.dataset.value)
  const newCount = currentCount - 1

  generatorColorCount.dataset.value = newCount
  generatorColorCount.innerText = newCount

  countIncreaseBtn.disabled = false
  if (newCount <= 1) {
    countDecreaseBtn.disabled = true
  }
})

countIncreaseBtn.addEventListener('click', () => {
  const currentCount = parseInt(generatorColorCount.dataset.value)
  const newCount = currentCount + 1

  generatorColorCount.dataset.value = newCount
  generatorColorCount.innerText = newCount

  countDecreaseBtn.disabled = false
  if (newCount >= 5) {
    countIncreaseBtn.disabled = true
  }
})

// expand/collapse the generator form
const expandGeneratorForm = () => {
  schemeCreatePane.classList.add('pane-displayed')

  setTimeout(() => {
    schemeCreatePane.classList.add('pane-visible')
  }, 100)
}

export const collapseGeneratorForm = () => {
  schemeCreatePane.classList.remove('pane-visible')

  setTimeout(() => {
    schemeCreatePane.classList.remove('pane-displayed')
  }, 300)
}

newSchemeBtn.addEventListener('click', expandGeneratorForm)
formCollapseBtn.addEventListener('click', collapseGeneratorForm)

// save the scheme objet from localstorage to database
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

// RANDOM SCHEME GENERATION
const getRandomSeed = () => {
  const randomSeed = Math.floor(Math.random() * 16777216).toString(16).padEnd(6, 0)
  return `#${randomSeed}`
}

const getRandomMode = () => {
  const randomIndex = Math.floor(Math.random() * modeDropdownOptions.length)
  const randomMode = modeDropdownOptions[randomIndex].value

  return randomMode
}

const getRandomCount = () => {
  const randomCount = Math.ceil(Math.random() * 5)
  return randomCount
}

export const getRandomScheme = async () => {
  const seed = getRandomSeed()
  const mode = getRandomMode()
  const count = getRandomCount()

  const schemeObj = await getColorScheme(seed, mode, count)
  
  return schemeObj
}