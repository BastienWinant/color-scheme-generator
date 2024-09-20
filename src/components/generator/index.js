import './style.css'

import { auth, db } from 'Src/app'
import { openLoginModal } from 'Components/auth'

const generatorDisplay = document.querySelector('#generator-display')
const colorInput = document.querySelector('#color')
const dropdownBtn = document.querySelector('#dropdown-btn')
const dropdownBtnText = document.querySelector('#dropdown-btn span')
const dropdownOptions = document.querySelectorAll('input[name="mode"]')
const getSchemeBtn = document.querySelector('#get-scheme-btn')

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

const getSchemeDislayHTML = (colorsArr) => {
  const liEls = colorsArr.colors.map(colorObj => {
    const liEl = document.createElement('li')
    liEl.classList.add('generator-display-color')

    liEl.innerHTML = `${colorObj.name.value}`
    return liEl
  })

  return liEls
}

getSchemeBtn.addEventListener('click', async (e) => {
  e.preventDefault()

  const color = colorInput.value.slice(1,)
  const mode = dropdownBtn.value

  const colorsArr = await getColorScheme(color, mode)

  if (colorsArr) {
    localStorage.setItem('csg-scheme', JSON.stringify(colorsArr))
    const colorsHTML = getSchemeDislayHTML(colorsArr)
    generatorDisplay.append(...colorsHTML)
  }
})

const initializeDisplay = () => {
  const randomHex = Math.floor(Math.random() * 16777216).toString(16).padEnd(6, '0')
  colorInput.value = randomHex

  const randomIndex = Math.floor(Math.random() * dropdownOptions.length)
  dropdownOptions[randomIndex].checked = true
  selectDropdownOption()
}
initializeDisplay()