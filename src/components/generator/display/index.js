import { ref, get, set, update } from 'firebase/database'

import { auth, db } from 'Src/app'
import { openLoginModal } from 'Components/auth'

const generatorDisplay = document.querySelector('#generator-display')

// retrieve the user's saved colors
const getUserColors = async (user) => {
  const uid = user.uid
  const userColorsRef = ref(db, '/user-colors/' + uid)
  const snapshot = await get(userColorsRef)

  if (snapshot.exists()) return snapshot.val()
  else return []
}

// convert schema data to list of DOM elements
const generateDisplayHTML = async (colorArr) => {
  let userColors = []
  if (auth.currentUser) userColors = await getUserColors(auth.currentUser)

  const liArr = colorArr.map(colorObj => {
    const liEl = document.createElement('li')
    liEl.classList.add('generator-color')
    liEl.dataset.hex = colorObj.hex.value

    // flag whether user has saved the color
    const colorSaved = userColors.includes(colorObj.hex.clean)
    liEl.dataset.saved = colorSaved.toString()
    
    const removeBtnStatus = colorArr.length > 1 ? '' : ' disabled'

    liEl.innerHTML = `
      <article class="generator-color-container">
        <hgroup>
          <h2>${colorObj.hex.value}</h2>
          <p>${colorObj.name.value}</p>
        </hgroup>
        <div>
          <button type="button" class="generator-color-btn generator-color-save">
            ${colorSaved ? `<i class="fa-solid fa-heart"></i>` : `<i class="fa-regular fa-heart"></i>`}
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

  return Promise.all(liArr)
}

export const updateDisplay = async (colorSchemeObj) => {
  generatorDisplay.innerHTML = ''
  const displayHTML = await generateDisplayHTML(colorSchemeObj.colors)
  generatorDisplay.append(...displayHTML)
}

export const showDisplayError = () => {
  const errorMessage = 'Digital Picasso is missing a little inspiration at this time...Try again?'

  document.querySelector('#generator-display').innerHTML = `
    <p class="generator-palceholder">${errorMessage}</p>`
}

const saveColor = (uid, colorData) => {
  // Use the hex value as key.
  const colorKey = colorData.hex.clean

  // Write the color hex in the user's color list.
  const userColorsRef = ref(db, '/user-colors/' + uid)
  get(userColorsRef).then(snapshot => {
    // retrieve the user's color list
    let userColors = snapshot.exists() ? snapshot.val() : []
    
    // user color entries should be unique
    if (!userColors.includes(colorKey)) {
      userColors.push(colorKey)
      set(userColorsRef, userColors)
    }
  })
  .catch(error => {
    console.log(error)
  })
  
  // Write the new color's data in the colors.
  update(ref(db, '/colors/' + colorKey), colorData)
}

const deleteColor = (uid, colorHex) => {
  // Delete the color hex from the user's color list.
  const userColorsRef = ref(db, '/user-colors/' + uid)
  get(userColorsRef).then(snapshot => {
    if (snapshot.exists()) {
      const userColors = snapshot.val()

      const colorIndex = userColors.indexOf(colorHex)
      if (colorIndex != -1) {
        userColors.splice(colorIndex, 1)
        set(userColorsRef, userColors)
      }
    }
  })
  .catch(error => {
    console.log(error)
  })
}

generatorDisplay.addEventListener('click', e => {
  const generatorColor = e.target.closest('.generator-color')
  const colorSchemeObj = JSON.parse(localStorage.getItem('csg-scheme'))
  const colorObj = colorSchemeObj.colors.find(colorObj => colorObj.hex.value === generatorColor.dataset.hex)

  if (e.target.closest('.generator-color-save')) {
    const currentUser = auth.currentUser

    if (currentUser) {
      const userId = currentUser.uid

      if (generatorColor.dataset.saved === 'true') {
        deleteColor(userId, colorObj.hex.clean)
        e.target.closest('.generator-color-save').innerHTML = `<i class="fa-regular fa-heart"></i>`
        generatorColor.dataset.saved = 'false'
      } else {
        saveColor(userId, colorObj)
        e.target.closest('.generator-color-save').innerHTML = `<i class="fa-solid fa-heart"></i>`
        generatorColor.dataset.saved = 'true'
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