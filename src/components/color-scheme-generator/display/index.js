import './style.css'

const colorsUl = document.querySelector('#generator-colors')

// creates one li element per color in the array
function createColorElements(colorsArr) {
  return colorsArr.map(colorObj => {
    const liEl = document.createElement('li')
    liEl.classList.add('generator-color')
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

// console.log(colorBtns)
// colorBtns.forEach(btnsDiv => {
//   console.log('testing')
//   btnsDiv.addEventListener('click', e => {
//     if (e.target.closest('.remove-color-btn')) {
//       console.log(e.target.closest('generator-color'))
//     }
//   })
// })

colorsUl.addEventListener('click', e => {
  if (e.target.closest('.remove-color-btn')) {
    const colorLi = e.target.closest('.generator-color')
    colorLi.remove()
  }
})