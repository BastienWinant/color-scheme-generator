import './style.css'

import { openSignupModal } from './ui-components/auth'
import {
  generatorForm,
  colorInput,
  modeInput,
  modeOptions,
  submitBtn,
  collapseModeDropdown,
  toggleModeDropdown,
  selectMode
} from './ui-components/color-scheme-generator/form'

import {
  displayUl,
  updateDisplay,
  displayOverlayMessage,
  saveColor,
  removeColor
} from './ui-components/color-scheme-generator/display'

// show/hide dropdown options on user click
modeInput.addEventListener('click', toggleModeDropdown)

// show/hide dropdown options
modeInput.addEventListener('click', toggleModeDropdown)

// make user selection visible in the dropdown
modeOptions.forEach(radioInput => {
  radioInput.addEventListener('click', selectMode)
})

// update the display when the user submits the form
submitBtn.addEventListener('click', e => {
  e.preventDefault()

  const color = colorInput.value.slice(1,)
  const mode = modeInput.value

  updateDisplay(color, mode)
  generatorForm.scrollIntoView()
})

// close the dropdown when the user clicks anywhere else on the page
document.addEventListener('click', e => {
  if (!e.target.closest('.mode-input')) {
    collapseModeDropdown()
  }
})

// listen for and dispatch click events on the display
displayUl.addEventListener('click', e => {
  const colorLi = e.target.closest('.generator-color')

  if (e.target.closest('.copy-color-btn')) {
    displayOverlayMessage(colorLi, 'Copied')
  } else if (e.target.closest('.remove-color-btn')) {
    removeColor(colorLi)
  } else if (e.target.closest('.save-color-btn')) {
    const colorSaved = saveColor(colorLi)

    if (colorSaved) {
      displayOverlayMessage(colorLi, 'Saved')
    } else {
      openSignupModal()
    }
  }
})

// Generate a random color scheme
function initializeDisplay() {
  // set a random hex color in the form input
  const randomHex = Math.floor(Math.random() * 16777216).toString(16).padEnd(6, '0')
  colorInput.value = `#${randomHex}`

  // select a random mode from the dropdown
  const randomIndex = Math.floor(Math.random() * modeOptions.length)
  const randomMode = modeOptions[randomIndex]
  randomMode.checked = true

  selectMode()
  updateDisplay(randomHex, randomMode.value, 5)
}

initializeDisplay()