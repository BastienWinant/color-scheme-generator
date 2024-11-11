import './index.css'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'Src/app'
import { getUserColors } from 'Src/utils'
import { openLoginModal, openSignupModal } from 'Components/auth'

const colorGrid = document.querySelector('#color-grid')

window.addEventListener('click', e => {
  if (e.target.id === 'login-modal-btn') {
    openLoginModal()
  } else if (e.target.id === 'signup-modal-btn') {
    openSignupModal()
  }
})

const monitorAuthState = async () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userColors = await getUserColors()

      if (Object.keys(userColors).length) {
        console.log(userColors)
      } else {
        colorGrid.innerHTML = `
          <div class="grid-placeholder">
            <p class="grid-placeholder-text">It's looking a little bland in here...</p>
            <a href="./index.html">Let's add some colors!</a>
          </div>`
      }
    } else {
      colorGrid.innerHTML = `
        <div class="grid-placeholder">
          <p class="grid-placeholder-text">Log in to save and view colors that inspire you!</p>
          <div class="grid-auth-btns">
            <button type="button" id="login-modal-btn" class="login-modal-btn" onclick="openLoginModal()">log in</button>
            <button type="button" id="signup-modal-btn" class="signup-modal-btn">sign up</button>
          </div>
        </div>`
    }
  })
}

monitorAuthState()