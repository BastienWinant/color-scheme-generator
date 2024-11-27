import '../index.css'
import './index.css'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'Src/app'
import { getUserColors, deleteColor } from 'Src/db_utils'
import { openLoginModal, openSignupModal } from 'Components/auth'

const colorGrid = document.querySelector('#color-grid')

const showEmptyGridCard = () => {
  colorGrid.innerHTML = `
    <div class="card placeholder-card">
      It's looking a little dull in here...
      <a href="#" class="card-link">Let's add some color!</a>
    </div>`
}

const showGridAuthCard = () => {
  colorGrid.innerHTML = `
    <div class="card placeholder-card">
      this is a test
    </div>`
}

colorGrid.addEventListener('click', e => {
  if (e.target.classList.contains('card-copy-btn')) {
    const cardEl = e.target.closest('.card')
    const hex = cardEl.dataset.hex
    navigator.clipboard.writeText(`#${hex}`)
  } else if (e.target.classList.contains('card-delete-btn')) {
    const cardEl = e.target.closest('.card')
    const hex = cardEl.dataset.hex
    const uid = auth.currentUser.uid
    deleteColor(hex, uid)
    updateColorGrid()
  }
})

const renderColorGrid = (userColors) => {
  colorGrid.innerHTML = Object.values(userColors).map(colorObj => {
    return `
      <figure class="card" data-name="${colorObj.name.value}" data-hex="${colorObj.hex.clean}">
        <img class="card-img" src="${colorObj.image.bare}" alt="Color hue" />
        <figcaption class="card-caption">
          <div class="card-body">
            <h2 class="card-title">${colorObj.name.value}</h2>
            <p class="card-subtitle">${colorObj.hex.value}</p>
          </div>
          <div class="card-btns">
            <button type="button" class="card-btn card-copy-btn">copy</button>
            <button type="button" class="card-btn card-delete-btn">delete</button>
          </div>
        </figcaption>
      </figure>`
  }).join('\n')
}

const updateColorGrid = async () => {
  const userColors = await getUserColors()

  if (Object.keys(userColors).length) {
    renderColorGrid(userColors)
  } else {
    showEmptyGridCard()
  }
}

const monitorAuthState = async () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      updateColorGrid()
    } else {
      // showGridAuthCard
    }
  })
}

monitorAuthState()