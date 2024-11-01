import './index.css'
import { ref, push, child, update, get, remove } from 'firebase/database'
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

const generateDisplayElements = async (colorsArr) => {
  const userColors = await getUserColors()
  const userColorHexCodes = Object.values(userColors).map(colorObj => colorObj.hex.clean)

  return colorsArr.map(colorObj => {
    const liEl = document.createElement('li')
    liEl.classList.add('generator-display-color')
    liEl.dataset.hex = colorObj.hex.clean

    const colorSaved = userColorHexCodes.includes(colorObj.hex.clean)
    
    liEl.dataset.saved = colorSaved ? '1' : ''

    liEl.innerHTML = `
      <h2>${colorObj.name.value}</h2>
      <p>${colorObj.hex.value}</p>
      <button type="button" class="generator-display-btn save-color-btn">
        ${colorSaved ? '<i class="fa-solid fa-heart"></i>' : '<i class="fa-regular fa-heart"></i>'}
      </button>
      <button type="button" class="generator-display-btn remove-color-btn">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <button type="button" class="generator-display-btn copy-color-btn">
        <i class="fa-solid fa-copy"></i>
      </button>`

    liEl.style.backgroundColor = colorObj.hex.value
    liEl.style.color = colorObj.contrast.value

    return liEl
  })
}

export const displayColorScheme = async (schemeObj) => {
  const liArray = await generateDisplayElements(schemeObj.colors)
  
  generatorDisplay.innerHTML = ''
  generatorDisplay.append(...liArray)
}

const removeSchemeColor = (schemeObj, e) => {
  const hex = e.target.closest('.generator-display-color').dataset.hex
  schemeObj.colors = schemeObj.colors.filter(color => color.hex.clean !== hex)
  localStorage.setItem('csg-scheme', JSON.stringify(schemeObj))
  e.target.closest('.generator-display-color').remove()

  const removeColorBtns = document.querySelectorAll('.remove-color-btn')

  if (removeColorBtns.length === 1) {
    removeColorBtns[0].disabled = true
  }
}

const writeNewColor = async (schemeObj, e, uid) => {
  // A color entry.
  const hex = e.target.closest('.generator-display-color').dataset.hex
  const colorObj = schemeObj.colors.find(color => color.hex.clean === hex)

  // Get a key for a new Color.
  const newColorKey = push(child(ref(db), 'colors')).key

  // Write the new color's data simultaneously in the colors list and the user's color list.
  const updates = {}
  updates[`/colors/${newColorKey}`] = colorObj
  updates[`/user-colors/${uid}/${newColorKey}`] = colorObj

  return update(ref(db), updates)
}

const deleteColor = async (schemeObj, e, uid) => {
  // A color entry.
  const hex = e.target.closest('.generator-display-color').dataset.hex
  const colorObj = schemeObj.colors.find(color => color.hex.clean === hex)

  const userColors = await getUserColors()

  try {
    for (const [id, entry] of Object.entries(userColors)) {
      if (colorObj.hex.value === entry.hex.value) {
        const colorRef = child(ref(db), `/user-colors/${uid}/${id}`)
        remove(colorRef)
        break
      }
    }
  } catch (error) {}
}

const copySchemeColor = (e) => {
  const hex = e.target.closest('.generator-display-color').dataset.hex
  navigator.clipboard.writeText(`#${hex}`)
}

generatorDisplay.addEventListener('click', e => {
  const schemeObj = JSON.parse(localStorage.getItem('csg-scheme'))

  if (e.target.closest('.save-color-btn')) {
    const currentUser = auth.currentUser

    if (currentUser) {
      const userId = currentUser.uid

      const displayColor = e.target.closest('.generator-display-color')
      const saveBtn = displayColor.querySelector('.save-color-btn')

      if (displayColor.dataset.saved) {
        deleteColor(schemeObj, e, userId)
        displayColor.dataset.saved = ''
        saveBtn.innerHTML = '<i class="fa-regular fa-heart"></i>'

      } else {
        writeNewColor(schemeObj, e, userId)
        displayColor.dataset.saved = '1'
        saveBtn.innerHTML = '<i class="fa-solid fa-heart"></i>'
      }
    } else {
      openLoginModal()
    }
  } else if (e.target.closest('.copy-color-btn')) {
    copySchemeColor(e)
  } else if (e.target.closest('.remove-color-btn')) {
    removeSchemeColor(schemeObj, e)
  }
})