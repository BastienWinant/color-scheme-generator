import '../index.css'

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'Src/app'
import { getUserColors, deleteColor, getColor } from 'Src/db_utils'
import { openLoginModal, openSignupModal } from 'Components/auth'

const colorGrid = document.querySelector('#color-grid')
const colorModal = document.querySelector('#color-modal')

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

const updateColorModal = async (hex) => {
  const colorObj = await getColor(hex)
  
  document.querySelector('#color-modal-img').src = colorObj.image.bare
  document.querySelector('#color-modal-name').textContent = colorObj.name.value

  document.querySelector('#color-modal-hex').textContent = colorObj.hex.value
  document.querySelector('#copy-hex-btn').value = colorObj.hex.value

  document.querySelector('#color-modal-rgb').textContent = colorObj.rgb.value
  document.querySelector('#copy-rgb-btn').value = colorObj.rgb.value

  document.querySelector('#color-modal-hsl').textContent = colorObj.hsl.value
  document.querySelector('#copy-hsl-btn').value = colorObj.hsl.value
}

const openColorModal = () => {
  colorModal.showModal()
}

const closeColorModal = () => {
  colorModal.close()
}

colorGrid.addEventListener('click', async e => {
  if (e.target.classList.contains('card-delete-btn')) {
    const userId = auth.currentUser.uid
    const colorHex = e.target.closest('.card').dataset.hex
    deleteColor(colorHex, userId)
    updateColorGrid()
  } else if (e.target.classList.contains('card-view-btn')) {
    const hex = e.target.closest('.card').dataset.hex
    await updateColorModal(hex)
    openColorModal()
  } else if (e.target.classList.contains('grid-login-btn')) {
    openLoginModal()
  } else if (e.target.classList.contains('grid-signup-btn')) {
    openSignupModal()
  }
})

window.addEventListener('click', e => {
  if (e.target.classList.contains('color-modal')) {
    closeColorModal()
  } else if (e.target.classList.contains('color-modal-btn')) {
    navigator.clipboard.writeText(e.target.value)
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