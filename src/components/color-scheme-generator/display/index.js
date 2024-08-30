import './style.css'

const colorsUl = document.querySelector('#generator-colors')

// creates one li element per color in the array
function createColorElements(colorsArr) {
  return colorsArr.map(colorObj => {
    const liEl = document.createElement('li')
    liEl.classList.add('generator-color')
    liEl.dataset.code = colorObj.hex.value
    liEl.style.backgroundColor = colorObj.hex.value
    liEl.style.color = colorObj.contrast.value

    const btnColorClass = colorObj.contrast.value === '#000000' ? 'dark-text' : 'light-text'

    liEl.innerHTML = `
      <div class="generator-color-inner">
        <div class="generator-color-btns">
          <button type="button" class="generator-color-btn remove-color-btn ${btnColorClass}">
            <i class="fa-solid fa-xmark fa-lg"></i>
          </button>
          <button type="button" class="generator-color-btn copy-color-btn ${btnColorClass}">
            <i class="fa-solid fa-copy fa-lg"></i>
          </button>
          <button type="button" class="generator-color-btn save-color-btn ${btnColorClass}">
            <i class="fa-regular fa-heart fa-lg"></i>
          </button>
        </div>
        <h2 class="generator-color-name">${colorObj.name.value}</h2>
        <p class="generator-color-code">${colorObj.hex.value}</p>
      </div>
      <div class="message-overlay"></div>
    `

    return liEl
  })
}

export function updateDisplay() {
  // request param values were previously set through from submission
  const colorHex = localStorage.getItem('gcs-color-hex')
  const colorMode = localStorage.getItem('gcs-color-mode')
  
  // build the full request url
  const baseURL = "https://www.thecolorapi.com"
  const endpoint = "scheme"
  const requestURL = `${baseURL}/${endpoint}?hex=${colorHex}&mode=${colorMode}`

  // use the api data to fill the ul colors container
  fetch(requestURL)
    .then(response => response.json())
    .then(data => {
      colorsUl.innerHTML = ''
      const colorLis = createColorElements(data.colors)
      colorsUl.append(...colorLis)
    })
}

function displayOverlayMessage(overlayEl, messageText) {
  overlayEl.innerHTML = `
      <p class="overlay-message-text">${messageText}!</p>`
      overlayEl.classList.add('overlay-displayed')
    setTimeout(() => {
      overlayEl.classList.remove('overlay-displayed')
    }, 750)
}

colorsUl.addEventListener('click', e => {
  const colorLi = e.target.closest('.generator-color')

  if (e.target.closest('.remove-color-btn')) {
    colorLi.remove()
  } else if (e.target.closest('.copy-color-btn')) {
    const colorCode = colorLi.dataset.code
    navigator.clipboard.writeText(colorCode)

    const overlayDiv = colorLi.querySelector('.message-overlay')
    displayOverlayMessage(overlayDiv, 'copied')
  } else if (e.target.closest('.save-color-btn')) {
    const overlayDiv = colorLi.querySelector('.message-overlay')
    displayOverlayMessage(overlayDiv, 'saved')
  }
})