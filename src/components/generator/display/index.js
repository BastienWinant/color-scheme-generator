const generatorDisplay = document.querySelector('#generator-display')

const generateDisplayHTML = (colorArr) => {
  return colorArr.map(colorObj => {
    const liEl = document.createElement('li')
    liEl.classList.add('generator-color')
    liEl.dataset.hex = colorObj.hex.value

    const removeBtnStatus = colorArr.length > 1 ? '' : ' disabled'

    liEl.innerHTML = `
      <article class="generator-color-container">
        <hgroup>
          <h2>${colorObj.hex.value}</h2>
          <p>${colorObj.name.value}</p>
        </hgroup>
        <div>
          <button type="button" class="generator-color-btn generator-color-save">
            <i class="fa-regular fa-heart"></i>
          </button>
          <button type="button" class="generator-color-btn generator-color-copy">
            <i class="fa-solid fa-copy"></i>
          </button>
          <button type="button" class="generator-color-btn generator-color-remove"${removeBtnStatus}>
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </article>
      `
    return liEl
  })
}

export const updateDisplay = (colorSchemeObj) => {
  generatorDisplay.innerHTML = ''
  const displayHTML = generateDisplayHTML(colorSchemeObj.colors)
  generatorDisplay.append(...displayHTML)
}

generatorDisplay.addEventListener('click', e => {
  const generatorColor = e.target.closest('.generator-color')
  const colorSchemeObj = JSON.parse(localStorage.getItem('csg-scheme'))

  if (e.target.closest('.generator-color-save')) {

  } else if (e.target.closest('.generator-color-remove')) {
    // remove the color element from the DOM
    generatorColor.remove()

    // remove the color from the scheme object in localStorage
    colorSchemeObj.colors = colorSchemeObj.colors.filter(colorObj => colorObj.hex.value != generatorColor.dataset.hex)
    localStorage.setItem('csg-scheme', JSON.stringify(colorSchemeObj))

    if (colorSchemeObj.colors.length === 1) {
      generatorDisplay.querySelector('.generator-color-remove').disabled = true
    }
  } else if (e.target.closest('.generator-color-copy')) {
    navigator.clipboard.writeText(generatorColor.dataset.hex)
  }
})