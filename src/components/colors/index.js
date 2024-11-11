import './index.css'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'Src/app'
import { getUserColors } from 'Src/utils'
import { openLoginModal, openSignupModal } from 'Components/auth'

const colorGrid = document.querySelector('#color-grid')

const fillColorGrid = (userColors) => {
  return
}

const showNoColorsMessage = () => {
  colorGrid.innerHTML = `
    <div class="color-grid-placeholder">
      <p>It's looking a little bland in here...</p>
      <a href="./index.html">Let's add some color!</a>
    </div>`
}

const showLoginMessage = () => {
  colorGrid.innerHTML = `
    <div class="color-grid-placeholder">
      <p>Log in to view your bookmarked colors</p>
      <div class="nav-btns">
        <button id="login-modal-btn" class="auth-btn">log in</button>
        <button id="signup-modal-btn" class="auth-btn">sign up</button>
      </div>
    </div>`
}

const monitorAuthState = async () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userColors = await getUserColors()

      if (Object.keys(userColors).length) {
        fillColorGrid(userColors)
      } else {
        showNoColorsMessage()
      }
    } else {
      showLoginMessage()
    }
  })
}

monitorAuthState()