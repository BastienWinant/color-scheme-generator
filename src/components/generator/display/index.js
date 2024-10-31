import './index.css'

import { ref, push, child, update, get } from 'firebase/database'

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
        return Object.values(snapshot.val()).map(colorObj => colorObj.hex.clean)
      } else {
        return []
      }
    } catch (error) {
      return []
    }
  }
}

const generateDisplayElements = async (colorsArr) => {
  let userColors = await getUserColors()

  return colorsArr.map(colorObj => {
    const liEl = document.createElement('li')
    liEl.classList.add('generator-display-color')
    liEl.dataset.hex = colorObj.hex.clean

    liEl.innerHTML = `
      <h2>${colorObj.name.value}</h2>
      <p>${colorObj.hex.value}</p>
      <button type="button" class="generator-display-btn save-color-btn">save color</button>
      <button type="button" class="generator-display-btn remove-color-btn">remove color</button>
      <button type="button" class="generator-display-btn copy-color-btn">copy color</button>`

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

const writeNewColor = (schemeObj, e, uid) => {
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

const copySchemeColor = (e) => {
  const hex = e.target.closest('.generator-display-color').dataset.hex
  navigator.clipboard.writeText(`#${hex}`)
}

generatorDisplay.addEventListener('click', e => {
  const schemeObj = JSON.parse(localStorage.getItem('csg-scheme'))

  if (e.target.classList.contains('save-color-btn')) {
    const currentUser = auth.currentUser

    if (currentUser) {
      const userId = currentUser.uid
      writeNewColor(schemeObj, e, userId)
    } else {
      openLoginModal()
    }
  } else if (e.target.classList.contains('copy-color-btn')) {
    copySchemeColor(e)
  } else if (e.target.classList.contains('remove-color-btn')) {
    removeSchemeColor(schemeObj, e)
  }
})