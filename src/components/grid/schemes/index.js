import '../index.css'

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'Src/app'
import { getUserSchemes, deleteScheme } from 'Src/db_utils'
import { openLoginModal, openSignupModal } from 'Components/auth'
import { showAuthPlaceholder, showNoDataPlaceholder, updateColorModal,
  openColorModal, closeColorModal, openSchemeModal, closeSchemeModal, updateSchemeModal } from 'Components/grid'

const schemeGrid = document.querySelector('#scheme-grid')

const renderSchemeGrid = (userSchemes) => {
  let htmlStr = ''
  for (const [key, schemeObj] of Object.entries(userSchemes)) {
    htmlStr += `
      <figure class="card" data-key="${key}">
        <img src="${schemeObj.image.bare}" class="card-img" />
        <figcaption class="card-body">
          <button type="button" class="card-view-btn">view</button>
          <button type="button" class="card-delete-btn">delete</button>
        </figcaption>
      </figure>\n`
  }

  schemeGrid.innerHTML = htmlStr
}

const updateSchemeGrid = async () => {
  const userSchemes = await getUserSchemes()

  if (Object.keys(userSchemes).length) {
    renderSchemeGrid(userSchemes)
  } else {
    showNoDataPlaceholder(schemeGrid)
  }
}

schemeGrid.addEventListener('click', async e => {
  if (e.target.classList.contains('card-delete-btn')) {
    const userId = auth.currentUser.uid
    const schemeKey = e.target.closest('.card').dataset.key
    deleteScheme(schemeKey, userId)
    updateSchemeGrid()
  } else if (e.target.classList.contains('card-view-btn')) {
    const key = e.target.closest('.card').dataset.key
    await updateSchemeModal(key)
    openSchemeModal()
  } else if (e.target.classList.contains('grid-login-btn')) {
    openLoginModal()
  } else if (e.target.classList.contains('grid-signup-btn')) {
    openSignupModal()
  }
})

window.addEventListener('click', async e => {
  if (e.target.classList.contains('scheme-modal')) {
    closeSchemeModal()
  } else if (e.target.classList.contains('scheme-modal-btn')) {
    const hex = e.target.value
    
  }
})

const monitorAuthState = async () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      updateSchemeGrid()
    } else {
      showAuthPlaceholder(schemeGrid)
    }
  })
}

monitorAuthState()