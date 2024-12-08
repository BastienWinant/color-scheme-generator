import { getColor } from 'Src/db_utils'

const colorModal = document.querySelector('#color-modal')
const colorModalImg = document.querySelector('#color-modal-img')
const colorModalName = document.querySelector('#color-modal-name')
const colorModalHex = document.querySelector('#color-modal-hex')
const colorModalRGB = document.querySelector('#color-modal-rgb')
const colorModalHSL = document.querySelector('#color-modal-hsl')
const copyHexBtn = document.querySelector('#copy-hex-btn')
const copyRGBBtn = document.querySelector('#copy-rgb-btn')
const copyHSLBtn = document.querySelector('#copy-hsl-btn')

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
  
  colorModalImg.src = colorObj.image.bare
  colorModalName.textContent = colorObj.name.value

  colorModalHex.textContent = colorObj.hex.value
  copyHexBtn.value = colorObj.hex.value

  colorModalRGB.textContent = colorObj.rgb.value
  copyRGBBtn.value = colorObj.rgb.value

  colorModalHSL.textContent = colorObj.hsl.value
  copyHSLBtn.value = colorObj.hsl.value
}

export const openColorModal = () => {
  colorModal.showModal()
}

export const closeColorModal = () => {
  colorModal.close()
}