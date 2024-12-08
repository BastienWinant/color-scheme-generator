import { getColor } from 'Src/db_utils'

const colorModal = document.querySelector('#color-modal')
const schemeModal = document.querySelector('#scheme-modal')

// GRID PLACEHOLDERS
export const showAuthPlaceholder = (gridContainer) => {
  gridContainer.innerHTML = `
    <div class="grid-placeholder">
      <p class="grid-placeholder-text">Tell us who you are and we'll paint your rainbow...</p>
      <div class="grid-placeholder-btns">
        <button class="grid-placeholder-btn grid-login-btn" type="button">log in</button>
        <button class="grid-placeholder-btn grid-signup-btn" type="button">sign up</button>
      </div>
    </div>`
}

export const showNoDataPlaceholder = (gridContainer) => {
  gridContainer.innerHTML = `
    <div class="grid-placeholder">
      <p class="grid-placeholder-text">It's looking a little bland in here...</p>
      <a href="./index.html" class="grid-placeholder-link">
        <i class="fa-solid fa-circle-plus"></i>
        <p>Let's add some color!</p>
      </a>
    </div>`
}

// COLOR MODAL
export const updateColorModal = async (hex) => {
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

export const openColorModal = () => {
  colorModal.showModal()
}

export const closeColorModal = () => {
  colorModal.close()
}