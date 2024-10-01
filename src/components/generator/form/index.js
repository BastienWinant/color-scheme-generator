import { ref, child, push, get, set } from 'firebase/database'

import { auth, db } from 'Src/app'
import { openLoginModal } from 'Components/auth'

const schemeCreatePane = document.querySelector('#scheme-create-pane')
const formCollapseBtn = document.querySelector('#form-collapse-btn')
const schemeSeed = document.querySelector('#seed')
const modeDropdownBtn = document.querySelector('#dropdown-btn')
const modeDropdownBtnText = document.querySelector('#dropdown-btn-text')
const modeDropdownList = document.querySelector('#dropdown-list')
const modeInputs = document.querySelectorAll('input[name="mode"]')
const schemeCount = document.querySelector('#count')
const countDecreaseBtn = document.querySelector('#count-decrease-btn')
const countIncreaseBtn = document.querySelector('#count-increase-btn')
export const getSchemeBtn = document.querySelector('#get-scheme-btn')
const newSchemeBtn = document.querySelector('#new-scheme-btn')
const saveSchemeBtn = document.querySelector('#save-scheme-btn')

formCollapseBtn.addEventListener('click', () => {
  schemeCreatePane.classList.toggle('pane-expanded')
})

const toggleDropdownList = () => {
  modeDropdownList.classList.toggle('dropdown-list-expanded')
}
modeDropdownBtn.addEventListener('click', toggleDropdownList)
// update the dropdown button to show the selected option
const selectModeOption = () => {
  const mode = document.querySelector('input[name="mode"]:checked').value
  modeDropdownBtnText.innerText = mode
  modeDropdownBtn.value = mode
  toggleDropdownList()
}
modeInputs.forEach(radioInput => {
  radioInput.addEventListener('click', selectModeOption)
})

// GENERATOR COUNT
const decreaseSchemeCount = () => {
  let count = parseInt(schemeCount.dataset.count)
  count = Math.max(1, count - 1)

  schemeCount.dataset.count = count
  schemeCount.innerText = count

  countIncreaseBtn.disabled = false
  if (count === 1) countDecreaseBtn.disabled = true
}
countDecreaseBtn.addEventListener('click', decreaseSchemeCount)

const increaseSchemeCount = () => {
  let count = parseInt(schemeCount.dataset.count)
  count = Math.min(5, count + 1)

  schemeCount.dataset.count = count
  schemeCount.innerText = count

  countDecreaseBtn.disabled = false
  if (count === 5) countIncreaseBtn.disabled = true
}
countIncreaseBtn.addEventListener('click', increaseSchemeCount)

// get data for a new color scheme from the Colors API
const getColorScheme = async (hex, mode, count) => {
  const baseUrl = 'https://www.thecolorapi.com'
  const endpoint = 'scheme'

  const requestUrl = `${baseUrl}/${endpoint}?hex=${hex}&mode=${mode}&count=${count}`

  try {
    const res = await fetch(requestUrl)
    const data = await res.json()

    return data
  } catch {}
}

// use form inputs to fetch and display a new color scheme
export const updateColorScheme = async () => {
  const seed = schemeSeed.value.slice(1,)
  const mode = modeDropdownBtn.value
  const count = schemeCount.dataset.count

  const colorSchemeObj = await getColorScheme(seed, mode, count)

  if (colorSchemeObj) {
    localStorage.setItem('csg-scheme', JSON.stringify(colorSchemeObj))
    return colorSchemeObj
  }
}

// manually update the form inputs
const setFormInputs = (seed, mode, count) => {
  schemeSeed.value = `#${seed}`

  mode.checked = true
  selectModeOption()

  schemeCount.dataset.count = count
  schemeCount.innerText = count
  if (count == 5) countIncreaseBtn.disabled = true
  else if (count == 1) countDecreaseBtn.disabled = true
}

export const initializeColorScheme = async () => {
  let colorSchemeObj = JSON.parse(localStorage.getItem('csg-scheme'))
  let seed, mode, count

  if (colorSchemeObj) {
    seed = colorSchemeObj.seed.hex.value.slice(1,)
    mode = Object.values(modeInputs).find(radioInput => radioInput.value === colorSchemeObj.mode)
    count = colorSchemeObj.count
  } else {
    // get random input values
    seed = Math.floor(Math.random() * 16777216).toString(16).padEnd(6, '0')
    mode = modeInputs[Math.floor(Math.random() * modeInputs.length)]
    count = Math.floor(Math.random() * 5) + 1

    // get a new color scheme from the API
    colorSchemeObj = await getColorScheme(seed, mode.value, count)
    localStorage.setItem('csg-scheme', JSON.stringify(colorSchemeObj))
  }
  
  // update the generator form and display
  setFormInputs(seed, mode, count)

  return colorSchemeObj
}

const saveScheme = (uid, schemeData) => {
  // Get a key for a new Scheme.
  const newSchemeKey = push(child(ref(db), 'schemes')).key

  // Write the scheme key in the user's scheme list.
  const userSchemesRef = ref(db, '/user-schemes/' + uid)
  get(userSchemesRef).then(snapshot => {
    let userSchemeIds = snapshot.exists() ? snapshot.val() : []
    userSchemeIds.push(newSchemeKey)
    set(userSchemesRef, userSchemeIds)
  })
  .catch(error => {
    console.log(error)
  })
  
  // Write the new scheme's data in the schemes.
  set(ref(db, '/schemes/' + newSchemeKey), schemeData)
}
saveSchemeBtn.addEventListener('click', () => {
  const currentUser = auth.currentUser

  if (currentUser) {
    const userId = currentUser.uid
    const colorSchemeObj = JSON.parse(localStorage.getItem('csg-scheme'))
    saveScheme(userId, colorSchemeObj)
  } else {
    openLoginModal()
  }
})

newSchemeBtn.addEventListener('click', () => {
  schemeCreatePane.classList.toggle('pane-expanded')
})