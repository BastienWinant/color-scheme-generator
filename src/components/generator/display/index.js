import './index.css'
import { auth } from 'Src/app'
import { openLoginModal } from 'Components/auth'
import { getUserColors, writeNewColor, deleteColor } from 'Src/utils'

const generatorDisplay = document.querySelector('#generator-display')

// returns a list of formatted li elements from a list of color data array
const generateDisplayElements = async (colorsArr) => {
  const userColors = await getUserColors()
  const userColorHexCodes = Object.values(userColors).map(colorObj => colorObj.hex.clean)

  const oneColor = colorsArr.length === 1

  return colorsArr.map(colorObj => {
    const articleEl = document.createElement('article')
    articleEl.classList.add('generator-display-color')
    articleEl.dataset.hex = colorObj.hex.clean

    // flag whether the current user has saved the color
    const colorSaved = userColorHexCodes.includes(colorObj.hex.clean)
    articleEl.dataset.saved = colorSaved ? '1' : '0'

    const colorClass = colorObj.contrast.value === '#000000' ? 'dark-text' : 'light-text'

    articleEl.innerHTML = `
      <div class="${colorClass}">
        <h2 class="generator-color-name">${colorObj.name.value}</h2>
        <p class="generator-color-hex">${colorObj.hex.value}</p>
      </div>
      <div class="generator-display-color-btns">
        <button type="button" class="generator-display-btn save-color-btn ${colorClass}">
          ${colorSaved ? '<i class="fa-solid fa-heart fa-lg"></i>' : '<i class="fa-regular fa-heart fa-lg"></i>'}
        </button>
        <button type="button" class="generator-display-btn remove-color-btn ${colorClass}" ${oneColor ? 'disabled' : ''}>
          <i class="fa-solid fa-xmark fa-lg"></i>
        </button>
        <button type="button" class="generator-display-btn copy-color-btn ${colorClass}">
          <i class="fa-solid fa-copy fa-lg"></i>
        </button>
      </div>`

    articleEl.style.backgroundColor = colorObj.hex.value

    return articleEl
  })
}

// render the new color scheme object in the DOM
export const displayColorScheme = async (schemeObj) => {
  const liArray = await generateDisplayElements(schemeObj.colors)
  
  generatorDisplay.innerHTML = ''
  generatorDisplay.append(...liArray)
}

const removeSchemeColor = (schemeObj, displayColor) => {
  const hex = displayColor.dataset.hex
  schemeObj.colors = schemeObj.colors.filter(color => color.hex.clean !== hex)

  // ensure the display is in sync with the localStorage object
  localStorage.setItem('csg-scheme', JSON.stringify(schemeObj))
  displayColor.remove()

  // deactivate the remove button if there is only one color left in the scheme
  const removeColorBtns = document.querySelectorAll('.remove-color-btn')
  if (removeColorBtns.length === 1) {
    removeColorBtns[0].disabled = true
  }
}

const copySchemeColor = (displayColor) => {
  const hex = displayColor.dataset.hex
  navigator.clipboard.writeText(`#${hex}`)
}

const displayCopyMessage = (displayColor) => {
  displayColor.innerHTML += `
    <div class="copy-message">
      <p>Copied!</p>
      <i class="fa-solid fa-check fa-lg"></i>
    </div>`

  setTimeout(() => {
    displayColor.querySelector('.copy-message').remove()
  }, 2000)
}

export const displayErrorMessage = () => {
  generatorDisplay.innerHTML = '<p class="generator-display-error">The generator was not very inspired this time. Try again?</p>'
}

// handle clicks on color display cards
generatorDisplay.addEventListener('click', e => {
  const schemeObj = JSON.parse(localStorage.getItem('csg-scheme'))

  // save/delete the color data in the database
  if (e.target.closest('.save-color-btn')) {
    const currentUser = auth.currentUser

    if (currentUser) {
      // retrieve the id of the current user
      const userId = currentUser.uid

      const displayColor = e.target.closest('.generator-display-color')
      const saveBtn = displayColor.querySelector('.save-color-btn')

      if (displayColor.dataset.saved === '1') {
        // delete the color from the database and update the save button
        deleteColor(displayColor.dataset.hex, userId)
        displayColor.dataset.saved = '0'
        saveBtn.innerHTML = '<i class="fa-regular fa-heart"></i>'
      } else {
        // save the scheme color object and update save the button 
        const colorObj = schemeObj.colors.find(color =>
          color.hex.clean === displayColor.dataset.hex)
        writeNewColor(colorObj, userId)
        displayColor.dataset.saved = '1'
        saveBtn.innerHTML = '<i class="fa-solid fa-heart"></i>'
      }
    } else {
      openLoginModal() // open the login modal if the current used is not logged in
    }
  } else if (e.target.closest('.copy-color-btn')) {
    const displayColor = e.target.closest('.generator-display-color')
    copySchemeColor(displayColor) // copy the hex code to the clipboard
    displayCopyMessage(displayColor)
  } else if (e.target.closest('.remove-color-btn')) {
    const displayColor = e.target.closest('.generator-display-color')
    removeSchemeColor(schemeObj, displayColor) // remove the color from the display and update localStorage
  }
})