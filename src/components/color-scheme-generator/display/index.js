import './style.css'

import { ref, child, push, update } from "firebase/database"

import { firebaseAuth, firebaseDB } from "../../../app"

export const colorsUl = document.querySelector('#generator-colors')

// creates one li element per color in the array
export function createColorElements(colorsArr, colorFormat) {
  return colorsArr.map(colorObj => {    
    const liEl = document.createElement('li')
    liEl.classList.add('generator-color')
    liEl.dataset.name = colorObj.name.value
    liEl.dataset.value = colorObj.hex.value
    liEl.style.backgroundColor = colorObj.hex.value
    liEl.style.color = colorObj.contrast.value

    const btnColorClass = colorObj.contrast.value === '#000000' ? 'dark-text' : 'light-text'

    liEl.innerHTML = `
      <div class="generator-color-inner">
        <div class="generator-color-btns">
          <button type="button" class="generator-color-btn remove-color-btn ${btnColorClass}">
            <i class="fa-solid fa-xmark fa-lg"></i>
          </button>
          <button type="button" class="generator-color-btn copy-color-btn ${btnColorClass}">
            <i class="fa-solid fa-copy fa-lg"></i>
          </button>
          <button type="button" class="generator-color-btn save-color-btn ${btnColorClass}">
            <i class="fa-regular fa-heart fa-lg"></i>
          </button>
        </div>
        <h2 class="generator-color-name">${colorObj.name.value}</h2>
        <p class="generator-color-code">${colorObj[colorFormat].value}</p>
      </div>
    `

    return liEl
  })
}

function deactivateColorRemoveBtns() {
  const removeBtns = document.querySelectorAll('.remove-color-btn')

  removeBtns.forEach(btn => {
    btn.disabled = true;
  })
}

function displayOverlayMessage(messageContainer, messageText) {
  messageContainer.insertAdjacentHTML(
    'beforeend',
    `<div class="message-overlay">
      <p class="overlay-message-text">${messageText}!</p>
    </div>`
  )

  setTimeout(() => {
    messageContainer.querySelector('.message-overlay').remove()
  }, 1000)
}

function removeSchemeColor(colorEl) {
  // update the scheme object in localstorage
  const schemeData = JSON.parse(localStorage.getItem('gcs-scheme'))
  schemeData.colors = schemeData.colors.filter(colorObj => colorObj.hex.value != colorEl.dataset.value)
  schemeData.count--
  localStorage.setItem('gcs-scheme', JSON.stringify(schemeData))
  
  // remove the corresponding DOM element
  colorEl.remove()

  if (schemeData.count === 1) {
    deactivateColorRemoveBtns()
  }
}

colorsUl.addEventListener('click', e => {
  const colorLi = e.target.closest('.generator-color')

  if (e.target.closest('.remove-color-btn')) {
    removeSchemeColor(colorLi)
  } else if (e.target.closest('.copy-color-btn')) {
    const colorCode = colorLi.dataset.value
    navigator.clipboard.writeText(colorCode)

    displayOverlayMessage(colorLi, 'copied')
  } else if (e.target.closest('.save-color-btn')) {

    if (firebaseAuth.currentUser) {
      const colorCode = colorLi.dataset.value
      
      // retrieve the logged user ID
      const userId = firebaseAuth.currentUser.uid
  
      // Get a key for a new color
      const newColorKey = push(child(ref(firebaseDB), 'colors')).key
  
      // Write the new color's value simultaneously in the colors list and the user's color list.
      const updates = {};
      updates['/colors/' + newColorKey] = colorCode
      updates['/user-colors/' + userId + '/' + newColorKey] = colorCode
  
      update(ref(firebaseDB), updates);
    } else {
      // openLoginModal()
    }

    displayOverlayMessage(colorLi, 'saved')
  }
})