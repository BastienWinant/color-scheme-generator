import '../index.css'

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'Src/app'
import { getUserColors, deleteColor } from 'Src/db_utils'
import { openLoginModal, openSignupModal } from 'Components/auth'

const colorGrid = document.querySelector('#color-grid')

const showAuthPlaceholder = () => {
  colorGrid.innerHTML = `
    <div class="grid-placeholder">
      <p class="grid-placeholder-text">Tell us who you are and we'll paint your rainbow...</p>
      <div class="grid-placeholder-btns">
        <button class="grid-placeholder-btn grid-login-btn" type="button">log in</button>
        <button class="grid-placeholder-btn grid-signup-btn" type="button">sign up</button>
      </div>
    </div>`
}

const showNoDataPlaceholder = () => {
  colorGrid.innerHTML = `
    <div class="grid-placeholder">
      <p class="grid-placeholder-text">It's looking a little bland in here...</p>
      <a href="./index.html" class="grid-placeholder-link">
        <i class="fa-solid fa-circle-plus"></i>
        <p>Let's add some color!</p>
      </a>
    </div>`
}

const renderColorGrid = (userColors) => {
  colorGrid.innerHTML = Object.values(userColors).map(colorObj => {
    return `
      <figure class="card" data-hex="${colorObj.hex.clean}">
        <img src="${colorObj.image.bare}" class="card-img" />
        <figcaption class="card-body">
          <h2 class="card-title">${colorObj.name.value}</h2>
          <button type="button" class="card-view-btn">view</button>
          <button type="button" class="card-delete-btn">delete</button>
        </figcaption>
      </figure>`
  }).join('\n')
}

const updateColorGrid = async () => {
  const userColors = await getUserColors()

  if (Object.keys(userColors).length) {
    renderColorGrid(userColors)
  } else {
    showNoDataPlaceholder()
  }
}

colorGrid.addEventListener('click', e => {
  if (e.target.classList.contains('card-delete-btn')) {
    const userId = auth.currentUser.uid
    const colorHex = e.target.closest('.card').dataset.hex
    deleteColor(colorHex, userId)
    updateColorGrid()
  } else if (e.target.classList.contains('card-view-btn')) {
    console.log('viewing')
  } else if (e.target.classList.contains('grid-login-btn')) {
    openLoginModal()
  } else if (e.target.classList.contains('grid-signup-btn')) {
    openSignupModal()
  }
})

const monitorAuthState = async () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      updateColorGrid()
    } else {
      showAuthPlaceholder()
    }
  })
}

monitorAuthState()