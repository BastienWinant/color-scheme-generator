const generatorDisplay = document.querySelector('#generator-display')

const generateDisplayHTML = (colorArr) => {
  return colorArr.map(colorObj => {
    const liEl = document.createElement('li')
    liEl.classList.add('generator-color')

    liEl.innerHTML = `${colorObj.hex.value}`
    return liEl
  })
}

export const updateDisplay = (colorSchemeObj) => {
  generatorDisplay.innerHTML = ''
  const displayHTML = generateDisplayHTML(colorSchemeObj.colors)
  generatorDisplay.append(...displayHTML)
}