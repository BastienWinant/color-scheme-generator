import './index.css'
import { auth } from 'Src/app'
import { openLoginModal } from 'Components/auth'
import { writeNewScheme } from 'Src/db_utils'

const closeCreatePaneBtn = document.querySelector('#close-create-pane-btn')
const schemeCreatePane = document.querySelector('#scheme-create-pane')
const seedInput = document.querySelector('#seed-input')
const modeDropdownBtn = document.querySelector('#mode-dropdown-btn')
const modeDropdownBtnText = document.querySelector('#mode-dropdown-btn-text')
const modeDropdownList = document.querySelector('#mode-dropdown-list')
const modeDropdownInputs = document.querySelectorAll('.mode-dropdown-input')
const colorCount = document.querySelector('#count')
export const countIncreaseBtn = document.querySelector('#count-increase-btn')
export const countDecreaseBtn = document.querySelector('#count-decrease-btn')
export const getSchemeBtn = document.querySelector('#get-scheme-btn')
const newSchemeBtn = document.querySelector('#new-scheme-btn')
const saveSchemeBtn = document.querySelector('#save-scheme-btn')

// fill the form input fields with fixed values
export const fillFormInputs = (color, mode, count) => {
  seedInput.value = color

  modeDropdownBtnText.innerText = mode
  modeDropdownBtn.value = mode
  for (const modeInput of modeDropdownInputs) {
    if (modeInput.value === mode) {
      modeInput.checked = true
      break
    }
  }

  colorCount.innerText = count
  colorCount.dataset.value = count
}

const gatherFormInputs = () => {
  const seedColor = seedInput.value
  const schemeMode = modeDropdownBtn.value
  const schemeCount = colorCount.dataset.value

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
const collapseDropdownList = () => {
  modeDropdownList.classList.remove('list-expanded')
}

const toggleDropdownList = () => {
  modeDropdownList.classList.toggle('list-expanded')
}
modeDropdownBtn.addEventListener('click', toggleDropdownList)

const updateModeDropdownBtn = () => {
  const mode = document.querySelector('.mode-dropdown-input:checked').value
  modeDropdownBtnText.textContent = mode
  modeDropdownBtn.value = mode
}
modeDropdownInputs.forEach(input => {
  input.addEventListener('click', e => {
    updateModeDropdownBtn()
  })
})

// COLOR COUNT
countDecreaseBtn.addEventListener('click', () => {
  const currentCount = parseInt(colorCount.dataset.value)
  const newCount = currentCount - 1

  colorCount.dataset.value = newCount
  colorCount.innerText = newCount

  countIncreaseBtn.disabled = false
  if (newCount <= 1) countDecreaseBtn.disabled = true
})

countIncreaseBtn.addEventListener('click', () => {
  const currentCount = parseInt(colorCount.dataset.value)
  const newCount = currentCount + 1

  colorCount.dataset.value = newCount
  colorCount.innerText = newCount

  countDecreaseBtn.disabled = false
  if (newCount >= 5) countIncreaseBtn.disabled = true
})

// expand/collapse the generator form
// const expandGeneratorForm = () => {
//   schemeCreatePane.classList.add('pane-displayed')

//   setTimeout(() => {
//     schemeCreatePane.classList.add('pane-visible')
//   }, 100)
// }
const expandGeneratorForm = () => {
  schemeCreatePane.classList.add('pane-expanded')
}
newSchemeBtn.addEventListener('click', expandGeneratorForm)

// export const collapseGeneratorForm = () => {
//   schemeCreatePane.classList.remove('pane-visible')

//   setTimeout(() => {
//     schemeCreatePane.classList.remove('pane-displayed')
//   }, 300)
// }
export const collapseGeneratorForm = () => {
  collapseDropdownList()
  schemeCreatePane.classList.remove('pane-expanded')
}
closeCreatePaneBtn.addEventListener('click', collapseGeneratorForm)

// save the scheme objet from localstorage to database
const showSaveMessage = () => {
  saveSchemeBtn.innerHTML = `<i class="fa-solid fa-check fa-lg"></i>`

  setTimeout(() => {
    saveSchemeBtn.innerHTML = `save`
  }, 750)
}

saveSchemeBtn.addEventListener('click', () => {
  const currentUser = auth.currentUser
  const schemeObj = JSON.parse(localStorage.getItem('csg-scheme'))
  
  if (currentUser && schemeObj) {
    const userId = currentUser.uid
    writeNewScheme(userId, schemeObj)
    showSaveMessage()
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
  const randomIndex = Math.floor(Math.random() * modeDropdownInputs.length)
  const randomMode = modeDropdownInputs[randomIndex].value

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