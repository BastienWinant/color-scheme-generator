import '../index.css'

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'Src/app'
import { getUserColors, deleteColor } from 'Src/db_utils'
import { openLoginModal, openSignupModal } from 'Components/auth'
import { showAuthPlaceholder, showNoDataPlaceholder, updateColorModal, openColorModal, closeColorModal } from 'Components/grid'

const colorGrid = document.querySelector('#color-grid')
const colorModal = document.querySelector('#color-modal')

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
    showNoDataPlaceholder(colorGrid)
  }
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

colorModal.addEventListener('click', e => {
  if (e.target.classList.contains('color-modal') || e.target.closest('.close-color-modal-btn')) {
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
      showAuthPlaceholder(colorGrid)
    }
  })
}

monitorAuthState()