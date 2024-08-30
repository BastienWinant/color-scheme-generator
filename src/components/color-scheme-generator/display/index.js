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
    `

    return liEl
  })
}

export function updateDisplay() {
  // request param values were previously set through from submission
  const colorHex = localStorage.getItem('gcs-color-hex') || '808080'
  const colorMode = localStorage.getItem('gcs-color-mode') || 'monochrome'
  const colorFormat = localStorage.getItem('gcs-color-format') || 'hex'
  
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

function deactivateColorRemoveBtns() {
  const removeBtns = document.querySelectorAll('.remove-color-btn')

  removeBtns.forEach(btn => {
    btn.disabled = true;
  })
}

function displayOverlayMessage(messageContainer, messageText) {
  messageContainer.insertAdjacentHTML(
    'beforeend',
    `<div class="message-overlay">
      <p class="overlay-message-text">${messageText}!</p>
    </div>`
  )

  setTimeout(() => {
    messageContainer.querySelector('.message-overlay').remove()
  }, 1000)
}

colorsUl.addEventListener('click', e => {
  const colorLi = e.target.closest('.generator-color')

  if (e.target.closest('.remove-color-btn')) {
    colorLi.remove()

    const displayedColors = document.querySelectorAll('.generator-color')
    
    if (displayedColors.length === 1) {
      deactivateColorRemoveBtns()
    }
  } else if (e.target.closest('.copy-color-btn')) {
    const colorCode = colorLi.dataset.code
    navigator.clipboard.writeText(colorCode)

    displayOverlayMessage(colorLi, 'copied')
  } else if (e.target.closest('.save-color-btn')) {
    displayOverlayMessage(colorLi, 'saved')
  }
})