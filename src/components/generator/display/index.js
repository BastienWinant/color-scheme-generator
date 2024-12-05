import './index.css'
import { auth } from 'Src/app'
import { openLoginModal } from 'Components/auth'
import { getUserColors, writeNewColor, deleteColor } from 'Src/db_utils'

const generatorDisplay = document.querySelector('#generator-display')

// returns a list of formatted li elements from a list of color data array
const generateDisplayElements = async (colorsArr) => {
  const userColors = await getUserColors()
  const userColorHexCodes = Object.values(userColors).map(colorObj => colorObj.hex.clean)

  const oneColor = colorsArr.length === 1

  return colorsArr.map(colorObj => {
    const liEl = document.createElement('li')
    liEl.classList.add('display-color')
    liEl.dataset.hex = colorObj.hex.clean
    liEl.dataset.name = colorObj.name.value

    // flag whether the current user has saved the color
    const colorSaved = userColorHexCodes.includes(colorObj.hex.clean)
    liEl.dataset.saved = colorSaved ? '1' : '0'

    liEl.innerHTML = `
      <div class="display-color-container">
        <hgroup class="display-color-info">
          <h2 class="display-color-name">${colorObj.name.value}</h2>
          <p class="display-color-hex">${colorObj.hex.value}</p>
        </hgroup>
        <div class="display-color-btns">
          <button type="button" class="display-color-btn save-color-btn">
            ${colorSaved ? '<i class="fa-solid fa-heart"></i>' : '<i class="fa-regular fa-heart"></i>'}
          </button>
          <button type="button" class="display-color-btn copy-color-btn">
            <i class="fa-solid fa-copy"></i>
          </button>
          <button type="button" class="display-color-btn remove-color-btn" ${oneColor ? 'disabled' : ''}>
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>`

    liEl.style.backgroundColor = colorObj.hex.value
    liEl.style.color = colorObj.contrast.value

    return liEl
  })
}

// render the new color scheme object in the DOM
export const displayColorScheme = async (schemeObj) => {
  const liArray = await generateDisplayElements(schemeObj.colors)
  
  generatorDisplay.innerHTML = ''
  generatorDisplay.append(...liArray)
}

const removeSchemeColor = (schemeObj, displayColor) => {
  // update scheme object (colors & count)
  const hex = displayColor.dataset.hex
  schemeObj.colors = schemeObj.colors.filter(color => color.hex.clean !== hex)
  schemeObj.count = schemeObj.colors.length

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
    <div class="display-color-overlay">
      <p>Copied!</p>
      <i class="fa-solid fa-check"></i>
    </div>`
  
  setTimeout(() => {
    displayColor.querySelector('.display-color-overlay').remove()
  }, 750)
}

export const displayErrorMessage = () => {
  generatorDisplay.innerHTML = '<p class="generator-display-error">The generator was not very inspired this time.<br />Try again?</p>'
}

// handle clicks on on the display
generatorDisplay.addEventListener('click', e => {
  const schemeObj = JSON.parse(localStorage.getItem('csg-scheme'))

  // save/delete the color data in the database
  if (e.target.closest('.save-color-btn')) {
    const currentUser = auth.currentUser

    if (currentUser) {
      // retrieve the id of the current user
      const userId = currentUser.uid

      const displayColor = e.target.closest('.display-color')
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
    const displayColor = e.target.closest('.display-color')
    copySchemeColor(displayColor) // copy the hex code to the clipboard
    displayCopyMessage(displayColor)
  } else if (e.target.closest('.remove-color-btn')) {
    const displayColor = e.target.closest('.display-color')
    removeSchemeColor(schemeObj, displayColor) // remove the color from the display and update localStorage
  }
})