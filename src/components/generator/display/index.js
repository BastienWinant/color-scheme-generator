import './index.css'

const generatorDisplay = document.querySelector('#generator-display')

const generateDisplayElements = (colorsArr) => {
  return colorsArr.map(colorObj => {
    const liEl = document.createElement('li')
    liEl.classList.add('generator-display-color')

    liEl.innerHTML = `${colorObj.name.value}`

    return liEl
  })
}

export const displayColorScheme = (schemeObj) => {
  const liArray = generateDisplayElements(schemeObj.colors)
  
  generatorDisplay.innerHTML = ''
  generatorDisplay.append(...liArray)
}