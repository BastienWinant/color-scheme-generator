const generatorDisplay = document.querySelector('#generator-display')

// convert an array of color object into an array of li DOM elements
const getSchemeDislayHTML = (colorSchemeObj) => {
  const liEls = colorSchemeObj.colors.map(colorObj => {
    const liEl = document.createElement('li')
    liEl.classList.add('generator-display-color')

    liEl.style.backgroundColor = colorObj.hex.value

    liEl.innerHTML = `${colorObj.name.value}`
    return liEl
  })

  return liEls
}

// render the color JSON data in the DOM
export const renderSchemeDisplay = async (colorSchemeObj) => {
  generatorDisplay.innerHTML = ''
  localStorage.setItem('csg-scheme', JSON.stringify(colorSchemeObj))
  const colorsHTML = getSchemeDislayHTML(colorSchemeObj)
  generatorDisplay.append(...colorsHTML)
}