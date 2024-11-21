import './index.css'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'Src/app'
import { getUserColors, deleteColor } from 'Src/utils'

const colorGrid = document.querySelector('#color-grid')

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
  }
})

const renderColorGrid = (userColors) => {
  colorGrid.innerHTML = Object.values(userColors).map(colorObj => {
    return `<figure class="color-card">
      <img class="color-card-img" src="${colorObj.image.bare}" alt="Color name and background." />
      <figcaption class="color-card-caption">
        <hgroup>
          <h2 class="color-card-name">${colorObj.name.value}</h2>
          <p class="color-card-hex">${colorObj.hex.clean}</p>
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
    console.log('no color saved')
  }
}

const monitorAuthState = async () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      updateColorGrid()
    } else {
      // showAuthPlaceholder()
      console.log('not logged id')
    }
  })
}

monitorAuthState()