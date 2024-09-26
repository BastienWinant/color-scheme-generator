import { ref, child, push, update } from 'firebase/database'

import { auth, db } from 'Src/app'
import { openLoginModal } from 'Components/auth'

const generatorDisplay = document.querySelector('#generator-display')

const generateDisplayHTML = (colorArr) => {
  return colorArr.map(colorObj => {
    const liEl = document.createElement('li')
    liEl.classList.add('generator-color')
    liEl.dataset.hex = colorObj.hex.value
    liEl.dataset.saved = '0'

    const removeBtnStatus = colorArr.length > 1 ? '' : ' disabled'

    liEl.innerHTML = `
      <article class="generator-color-container">
        <hgroup>
          <h2>${colorObj.hex.value}</h2>
          <p>${colorObj.name.value}</p>
        </hgroup>
        <div>
          <button type="button" class="generator-color-btn generator-color-save">
            <i class="fa-regular fa-heart"></i>
          </button>
          <button type="button" class="generator-color-btn generator-color-copy">
            <i class="fa-solid fa-copy"></i>
          </button>
          <button type="button" class="generator-color-btn generator-color-remove"${removeBtnStatus}>
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </article>
      `
    return liEl
  })
}

export const updateDisplay = (colorSchemeObj) => {
  generatorDisplay.innerHTML = ''
  const displayHTML = generateDisplayHTML(colorSchemeObj.colors)
  generatorDisplay.append(...displayHTML)
}

function writeNewColor(uid, colorData) {
  // Use the hex value as key.
  const colorKey = colorData.hex.clean

  // Write the new color's data simultaneously in the colors list and the user's color list.
  const updates = {};
  updates['/colors/' + colorKey] = colorData
  updates['/user-colors/' + uid + '/' + colorKey] = colorData;

  return update(ref(db), updates);
}

generatorDisplay.addEventListener('click', e => {
  const generatorColor = e.target.closest('.generator-color')
  const colorSchemeObj = JSON.parse(localStorage.getItem('csg-scheme'))
  const colorObj = colorSchemeObj.colors.find(colorObj => colorObj.hex.value === generatorColor.dataset.hex)

  if (e.target.closest('.generator-color-save')) {
    const currentUser = auth.currentUser

    if (currentUser) {
      const userId = currentUser.uid
      console.log(generatorColor.dataset.saved)
      if (generatorColor.dataset.saved === '1') {
        console.log('unsaving the color')
        e.target.closest('.generator-color-save').innerHTML = `<i class="fa-regular fa-heart"></i>`
        generatorColor.dataset.saved = '0'
      } else {
        console.log('saving the color')
        writeNewColor(userId, colorObj)
        e.target.closest('.generator-color-save').innerHTML = `<i class="fa-solid fa-heart"></i>`
        generatorColor.dataset.saved = '1'
      }
    } else {
      openLoginModal()
    }

  } else if (e.target.closest('.generator-color-remove')) {
    // remove the color element from the DOM
    generatorColor.remove()

    // remove the color from the scheme object in localStorage
    colorSchemeObj.colors = colorSchemeObj.colors.filter(colorObj => colorObj.hex.value != generatorColor.dataset.hex)
    localStorage.setItem('csg-scheme', JSON.stringify(colorSchemeObj))

    if (colorSchemeObj.colors.length === 1) {
      generatorDisplay.querySelector('.generator-color-remove').disabled = true
    }
  } else if (e.target.closest('.generator-color-copy')) {
    navigator.clipboard.writeText(generatorColor.dataset.hex)
  }
})