import './index.css'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'Src/app'
import { getUserColors } from 'Src/utils'

const colorGrid = document.querySelector('#color-grid')

const renderColorGrid = (userColors) => {
  colorGrid.innerHTML = Object.values(userColors).map(colorObj => {
    return `<figure class="color-card">
      <img class="color-card-img" src="${colorObj.image.bare}" alt="Color name and background." />
      <figcaption class="color-card-caption">
        <hgroup>
          <h2>${colorObj.name.value}</h2>
          <p>${colorObj.hex.clean}</p>
        </hgroup>
        <section class="color-card-btns">
          <button type="button" class="color-card-btn color-copy-btn">copy</button>
          <button type="button" class="color-card-btn color-delete-btn">remove</button>
        </section>
      </figcaption>
    </figure>`
  }).join('\n')
}

const monitorAuthState = async () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userColors = await getUserColors()

      if (Object.keys(userColors).length) {
        console.log(Object.values(userColors))
        renderColorGrid(userColors)
        // console.log(userColors)
      } else {
        // showNoColorPlaceholder()
        console.log('no color saved')
      }
    } else {
      // showAuthPlaceholder()
      console.log('not logged id')
    }
  })
}

monitorAuthState()