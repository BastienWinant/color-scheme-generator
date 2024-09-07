import './style.css'

import { ref, child, push, update } from "firebase/database"

import checkMark from './img/check-single.svg'

import { auth, db } from './app'
import { openSignupModal } from './ui-components/auth'

const generatorForm = document.querySelector('#generator-form')
const colorInput = document.querySelector('#color')
const modeInput = document.querySelector('#mode')
const modeInputText = document.querySelector('#dropdown-btn-text')
const modeDropdown = document.querySelector('#mode-options')
const modeOptions = document.querySelectorAll('input[name="mode"]')
const modeOptionValues = document.querySelectorAll('input[name="mode"] + span')
const submitBtn = document.querySelector('#submit')
const displayUl = document.querySelector('#generator-display')

// FORM
// hide dropdown options
function collapseModeDropdown() {
  modeDropdown.classList.remove('dropdown-expanded')
}

// show/hide dropdown options
function toggleModeDropdown() {
  modeDropdown.classList.toggle('dropdown-expanded')
}
mode.addEventListener('click', toggleModeDropdown)

// make user selection visible in the dropdown
function selectMode() {
  // remove all checkmarks
  modeOptionValues.forEach(spanEl => {
    const imgEl = spanEl.querySelector('img')

    if (imgEl) {
      imgEl.remove()
    }
  })

  // add checkmark to the selected mode
  document.querySelector('input[name="mode"]:checked + span')
            .innerHTML +=
              `<img src="${checkMark}" alt="checkmark icon" class="checkmark-img">`

  // show the selected mode in the dropdown button
  const selectedMode = document.querySelector('input[name="mode"]:checked').value
  modeInput.value = selectedMode.toLowerCase()
  modeInputText.innerText = selectedMode
}

modeOptions.forEach(radioInput => {
  radioInput.addEventListener('click', selectMode)
})

// DISPLAY
function clearDisplay() {
  displayUl.innerHTML = ''
}

// create one li element per array entry
function generateDisplayColors(colorsArr) {
  return colorsArr.map(colorObj => {
    const colorLi = document.createElement('li')
    colorLi.classList.add('generator-color')
    colorLi.dataset.hex = colorObj.hex.value
    colorLi.style.backgroundColor = colorObj.hex.value

    const colorClass = colorObj.contrast.value === '#000000'
                                                    ? 'dark-text'
                                                    : 'light-text'

    colorLi.innerHTML = `
      <div class="generator-color-inner">
        <h2 class="generator-color-hex ${colorClass}">${colorObj.hex.value}</h2>
        <p class="generator-color-name ${colorClass}">${colorObj.name.value}</p>
        <div class="generator-color-btns">
          <button type="button" class="generator-color-btn copy-color-btn ${colorClass}" aria-label="copy">
            <i class="fa-solid fa-copy fa-lg"></i>
          </button>
          <button type="button" class="generator-color-btn save-color-btn ${colorClass}" aria-label="save">
            <i class="fa-regular fa-bookmark fa-lg"></i>
          </button>
          <button type="button" class="generator-color-btn remove-color-btn ${colorClass}" aria-label="delete">
            <i class="fa-regular fa-trash-can fa-lg"></i>
          </button>
        </div>
      </div>`

    return colorLi
  })
}

// render the API data inside a stylized list
function updateDisplay(hex, mode) {
  const baseUrl = 'https://www.thecolorapi.com'
  const endpoint = 'scheme'

  const requestUrl = `${baseUrl}/${endpoint}?hex=${hex.toLowerCase()}&mode=${mode.toLowerCase()}`

  fetch(requestUrl)
    .then(response => response.json())
    .then(data => {
      clearDisplay()
      const displayColors = generateDisplayColors(data.colors)
      displayUl.append(...displayColors)
    })
}

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

// give a visual clue that the color value has been copied to the clipboard
function displayOverlayMessage(colorEl, messageContent) {
  navigator.clipboard.writeText(colorEl.dataset.hex)

  colorEl.insertAdjacentHTML(
    'beforeend',
    `<div class="generator-color-overlay">
      <p class="generator-color-msg">${ messageContent } <i class="fa-solid fa-check"></i></p>
    </div>`
  )

  setTimeout(() => {
    const overlayEl = colorEl.querySelector('.generator-color-overlay')
    overlayEl.remove()
  }, 1500)
}

// remove color from display
function removeColor(colorEl) {
  colorEl.remove()

  // deactivate the color removal button if there is only one color left in the display
  const removeBtns = document.querySelectorAll('.remove-color-btn')
  if (removeBtns.length === 1) {
    removeBtns[0].disabled = true
  }
}

// save color to database
function saveColor(colorEl) {
  if (auth.currentUser) {
    const uid = auth.currentUser.uid
    
    // A color entry.
    const colorData = {
      hex: colorEl.dataset.hex
    }

    // Get a key for a new color.
    const newColorKey = push(child(ref(db), 'colors')).key;

    // Write the new color's data simultaneously in the colors list and the user's color list.
    const updates = {}
    updates['/colors/' + newColorKey] = colorData
    updates['/user-colors/' + uid + '/' + newColorKey] = colorData

    update(ref(db), updates)

    displayOverlayMessage(colorEl, 'Saved')
  } else {
    openSignupModal()
  }
}

// listen for and dispatch click events on the display
displayUl.addEventListener('click', e => {
  const colorLi = e.target.closest('.generator-color')

  if (e.target.closest('.copy-color-btn')) {
    displayOverlayMessage(colorLi, 'Copied')
  } else if (e.target.closest('.remove-color-btn')) {
    removeColor(colorLi)
  } else if (e.target.closest('.save-color-btn')) {
    saveColor(colorLi)
  }
})

initializeDisplay()