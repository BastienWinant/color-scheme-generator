import '../style.css'

import { ref, child, push, update } from "firebase/database"

import { auth, db } from '../../../app'
import { openSignupModal } from '../../auth'

export const displayUl = document.querySelector('#generator-display')

function clearDisplay() {
  displayUl.innerHTML = ''
}

// create one li element per array entry
function generateDisplayColors(colorsArr) {
  return colorsArr.map((colorObj, index) => {
    // create color as a new DOM li element
    const colorLi = document.createElement('li')
    colorLi.classList.add('generator-color')

    // attach color data to the li
    colorLi.dataset.hex = colorObj.hex.value
    colorLi.dataset.name = colorObj.name.value
    colorLi.dataset.index = index
    
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
export function updateDisplay(hex, mode) {
  const baseUrl = 'https://www.thecolorapi.com'
  const endpoint = 'scheme'

  const requestUrl = `${baseUrl}/${endpoint}?hex=${hex.toLowerCase()}&mode=${mode.toLowerCase()}`

  fetch(requestUrl)
    .then(response => response.json())
    .then(data => {
      clearDisplay()
      const displayColors = generateDisplayColors(data.colors)
      displayUl.append(...displayColors)
      localStorage.setItem('csg-color-scheme', JSON.stringify(data))
    })
}

// give a visual clue that the color value has been copied to the clipboard
export function displayOverlayMessage(colorEl, messageContent) {
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
export function removeColor(colorEl) {
  // retrieve the color scheme object from local storage
  const colorHex = colorEl.dataset.hex
  let colorScheme = JSON.parse(localStorage.getItem('csg-color-scheme'))
  
  // delete the color entry from the object
  colorScheme.colors = colorScheme.colors.filter(colorObj => colorObj.hex.value !== colorHex)
  colorScheme.count--
  
  // save the updated object back to local storage
  localStorage.setItem('csg-color-scheme', JSON.stringify(colorScheme))

  // removing the corresponding element from the DOM
  colorEl.remove()

  // deactivate the color removal button if there is only one color left in the display
  const removeBtns = document.querySelectorAll('.remove-color-btn')
  if (removeBtns.length === 1) {
    removeBtns[0].disabled = true
  }
}

// save color to database
export function saveColor(colorEl) {
  if (auth.currentUser) {
    const uid = auth.currentUser.uid
    
    // A color entry.
    const colorData = {
      hex: colorEl.dataset.hex,
      name: colorEl.dataset.name
    }

    // Get a key for a new color.
    const newColorKey = push(child(ref(db), 'colors')).key;

    // Write the new color's data simultaneously in the colors list and the user's color list.
    const updates = {}
    updates['/colors/' + newColorKey] = colorData
    updates['/user-colors/' + uid + '/' + newColorKey] = colorData

    return update(ref(db), updates)
  } else {
    openSignupModal()
  }
}