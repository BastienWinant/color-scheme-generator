import './index.css'
import { ref, set, child, get, remove } from 'firebase/database'
import { auth, db } from 'Src/app'
import { openLoginModal } from 'Components/auth'

const generatorDisplay = document.querySelector('#generator-display')

const getUserColors = async () => {
  const currentUser = auth.currentUser
  if (currentUser) {
    const userId = currentUser.uid

    try {
      const userColorsRef = child(ref(db), `/user-colors/${userId}`)
      const snapshot = await get(userColorsRef)

      if (snapshot.exists()) {
        return snapshot.val()
      } else {
        return {}
      }
    } catch (error) {
      return {}
    }
  }

  return {}
}

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

    articleEl.innerHTML = `
      <h2>${colorObj.name.value}</h2>
      <p>${colorObj.hex.value}</p>
      <button type="button" class="generator-display-btn save-color-btn">
        ${colorSaved ? '<i class="fa-solid fa-heart"></i>' : '<i class="fa-regular fa-heart"></i>'}
      </button>
      <button type="button" class="generator-display-btn remove-color-btn" ${oneColor ? 'disabled' : ''}>
        <i class="fa-solid fa-xmark"></i>
      </button>
      <button type="button" class="generator-display-btn copy-color-btn">
        <i class="fa-solid fa-copy"></i>
      </button>`

    articleEl.style.backgroundColor = colorObj.hex.value
    articleEl.style.color = colorObj.contrast.value

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

const writeNewColor = async (colorObj, uid) => {
  // Use the color hex code as unique table id
  const newColorKey = colorObj.hex.clean
  const userColorRef = child(ref(db), `/user-colors/${uid}/${newColorKey}`)
  return set(userColorRef, colorObj)
}

// remove a user color from the database
const deleteColor = async (hex, uid) => {
  try {
    // the hex value is used as the key in the table
    const colorRef = child(ref(db), `/user-colors/${uid}/${hex}`)
    remove(colorRef)
  } catch {}
}

const copySchemeColor = (displayColor) => {
  const hex = displayColor.dataset.hex
  navigator.clipboard.writeText(`#${hex}`)
}

const displayCopyMessage = (displayColor) => {
  displayColor.innerHTML += `
    <p class="copy-message">Copied!</p>`

  setTimeout(() => {
    displayColor.querySelector('.copy-message').remove()
  }, 2000)
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