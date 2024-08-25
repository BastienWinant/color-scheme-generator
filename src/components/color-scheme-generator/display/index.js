const colorsUl = document.querySelector('#generator-colors')

function createColorElements(colorsArr) {
  return colorsArr.map(colorObj => {
    const liEl = document.createElement('li')
    liEl.classList.add('generator-color')

    liEl.innerHTML = `${colorObj.hex.value}`

    return liEl
  })
}


export function updateDisplay() {
  const colorHex = localStorage.getItem('gcs-color-hex')
  const colorMode = localStorage.getItem('gcs-color-mode')
  const colorCount = localStorage.getItem('gcs-color-count')
  
  const baseURL = "https://www.thecolorapi.com"
  const endpoint = "scheme"
  const requestURL = `${baseURL}/${endpoint}?hex=${colorHex}&mode=${colorMode}&count=${colorCount}`

  fetch(requestURL)
    .then(response => response.json())
    .then(data => {
      colorsUl.innerHTML = ''
      const colorLis = createColorElements(data.colors)
      colorsUl.append(...colorLis)
    })
}