import './index.css'

const generatorDisplay = document.querySelector('#generator-display')

const generateDisplayElements = (colorsArr) => {
  return colorsArr.map(colorObj => {
    const liEl = document.createElement('li')
    liEl.classList.add('generator-display-color')
    liEl.dataset.hex = colorObj.hex.clean

    liEl.innerHTML = `
      <h2>${colorObj.name.value}</h2>
      <p>${colorObj.hex.value}</p>
      <button type="button" class="generator-display-btn save-color-btn">save color</button>
      <button type="button" class="generator-display-btn remove-color-btn">remove color</button>
      <button type="button" class="generator-display-btn copy-color-btn">copy color</button>`

    liEl.style.backgroundColor = colorObj.hex.value

    return liEl
  })
}

export const displayColorScheme = (schemeObj) => {
  const liArray = generateDisplayElements(schemeObj.colors)
  
  generatorDisplay.innerHTML = ''
  generatorDisplay.append(...liArray)
}

const removeSchemeColor = (schemeObj, e) => {
  const hex = e.target.closest('.generator-display-color').dataset.hex
  schemeObj.colors = schemeObj.colors.filter(color => color.hex.clean !== hex)
  localStorage.setItem('csg-scheme', JSON.stringify(schemeObj))
  e.target.closest('.generator-display-color').remove()

  const removeColorBtns = document.querySelectorAll('.remove-color-btn')

  if (removeColorBtns.length === 1) {
    removeColorBtns[0].disabled = true
  }
}

const saveSchemeColor = () => {
  
}

const copySchemeColor = (e) => {
  const hex = e.target.closest('.generator-display-color').dataset.hex
  navigator.clipboard.writeText(`#${hex}`);
}

generatorDisplay.addEventListener('click', e => {
  const schemeObj = JSON.parse(localStorage.getItem('csg-scheme'))

  if (e.target.classList.contains('save-color-btn')) {
    const hex = e.target.closest('.generator-display-color').dataset.hex
    const colorObj = schemeObj.colors.find(color => color.hex.clean === hex)
    console.log(colorObj)
  } else if (e.target.classList.contains('copy-color-btn')) {
    copySchemeColor(e)
  } else if (e.target.classList.contains('remove-color-btn')) {
    removeSchemeColor(schemeObj, e)
  }
})