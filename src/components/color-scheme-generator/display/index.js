import './style.css'

const colorsUl = document.querySelector('#generator-colors')

// creates one li element per color in the array
function createColorElements(colorsArr) {
  return colorsArr.map(colorObj => {
    const liEl = document.createElement('li')
    liEl.classList.add('generator-color')
    liEl.style.backgroundColor = colorObj.hex.value

    liEl.innerHTML = `${colorObj.hex.value}`

    return liEl
  })
}

export function updateDisplay() {
  // reqeust param values were previously set through from submission
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