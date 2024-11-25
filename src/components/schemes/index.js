import './index.css'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'Src/app'
import { getUserSchemes, deleteColor } from 'Src/db_utils'
import { openLoginModal, openSignupModal } from 'Components/auth'

const schemeGrid = document.querySelector('#schemes-grid')

const updateSchemeGrid = async () => {
  const userSchemes = await getUserSchemes()

  if (Object.keys(userColors).length) {
    renderColorGrid(userColors)
  } else {
    colorGrid.innerHTML = ''
  }
}

const monitorAuthState = async () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      updateSchemeGrid()
    } else {
      showAuthPlaceholder()
    }
  })
}

monitorAuthState()