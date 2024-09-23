import 'Src/style.css'
import './style.css'

export const generatorDisplay = document.querySelector('#generator-display')

export const generateSchemeHTML = (colorSchemeObj) => {
  return colorSchemeObj.colors.map(colorObj => {
    const liEl = document.createElement('li')
    liEl.classList.add('generator-display-color')

    liEl.style.backgroundColor = colorObj.hex.value
    liEl.style.color = colorObj.contrast.value

    liEl.innerHTML = `${colorObj.hex.value}`

    return liEl
  })
}

export const renderColorScheme = (colorSchemeObj) => {
  localStorage.setItem('csg-scheme', JSON.stringify(colorSchemeObj))
  const colorSchemeHTML = generateSchemeHTML(colorSchemeObj)
  
  generatorDisplay.innerHTML = ''
  generatorDisplay.append(...colorSchemeHTML)
}