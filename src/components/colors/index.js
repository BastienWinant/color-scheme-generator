import './index.css'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'Src/app'
import { getUserColors, deleteColor } from 'Src/db_utils'
import { openLoginModal, openSignupModal } from 'Components/auth'

const colorGrid = document.querySelector('#color-grid')

const showAuthPlaceholder = () => {
  colorGrid.innerHTML = `
    <section class="grid-placeholder">
      Log in to your account to see saved colors
      <div class="grid-placeholder-btns">
        <button type="button" class="grid-placeholder-btn grid-login-btn">log in</button>
        <button type="button" class="grid-placeholder-btn grid-signup-btn">sign up</button>
      </div>
    </section>
  `
}

colorGrid.addEventListener('click', e => {
  if (e.target.classList.contains('color-delete-btn')) {
    const colorCard = e.target.closest('.color-card-caption')
    const hex = colorCard.querySelector('.color-card-hex').innerText
    const uid = auth.currentUser.uid
    deleteColor(hex, uid)
    updateColorGrid()
  } else if (e.target.classList.contains('color-copy-btn')) {
    const colorCard = e.target.closest('.color-card-caption')
    const hex = colorCard.querySelector('.color-card-hex').innerText
    navigator.clipboard.writeText(`#${hex}`)
  } else if (e.target.classList.contains('grid-login-btn')) {
    openLoginModal()
  } else if (e.target.classList.contains('grid-signup-btn')) {
    openSignupModal()
  }
})

const renderColorGrid = (userColors) => {
  colorGrid.innerHTML = Object.values(userColors).map(colorObj => {
    return `<figure class="color-card">
      <img class="color-card-img" src="${colorObj.image.bare}" alt="Color name and background." />
      <figcaption class="color-card-caption">
        <hgroup>
          <h2 class="color-card-name">${colorObj.name.value}</h2>
          <p class="color-card-hex">${colorObj.hex.value}</p>
        </hgroup>
        <section class="color-card-btns">
          <button type="button" class="color-card-btn color-copy-btn">copy</button>
          <button type="button" class="color-card-btn color-delete-btn">remove</button>
        </section>
      </figcaption>
    </figure>`
  }).join('\n')
}

const updateColorGrid = async () => {
  const userColors = await getUserColors()

  if (Object.keys(userColors).length) {
    renderColorGrid(userColors)
  } else {
    colorGrid.innerHTML = ''
  }
}

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