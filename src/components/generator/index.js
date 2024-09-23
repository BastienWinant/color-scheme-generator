import 'Src/style.css'
import './style.css'

import {
  colorInput,
  modeDropdownBtn,
  modeOptions,
  selectDropdownOption,
  getSchemeBtn,
  getColorScheme,
  countDecreaseBtn,
  countIncreaseBtn,
  generatorCount
} from './form'
import { renderColorScheme } from './display'

getSchemeBtn.addEventListener('click', async e => {
  e.preventDefault()

  const color = colorInput.value.slice(1,)
  const mode = modeDropdownBtn.value
  const count = generatorCount.dataset.count

  const colorSchemeObj = await getColorScheme(color, mode, count)

  if (colorSchemeObj) renderColorScheme(colorSchemeObj)
})

const initializeDisplay = async () => {
  // check if a scheme object is stored locally
  let colorSchemeObj = JSON.parse(localStorage.getItem('csg-scheme'))

  if (colorSchemeObj) {
    const color = colorSchemeObj.seed.hex.value
    colorInput.value = color

    const mode = colorSchemeObj.mode
    Object.values(modeOptions).find(radioInput => radioInput.value === mode).checked = true
    selectDropdownOption()

    const count = colorSchemeObj.count
    generatorCount.dataset.count = count
    generatorCount.innerText = count

    if (count === 5) {
      countIncreaseBtn.disabled = true
    } else if (count === 0) {
      countDecreaseBtn.disabled = true
    }

  } else {
    // select a random color
    const randomColor = Math.floor(Math.random() * 16777216).toString(16).padEnd(6, '0')
    colorInput.value = `#${randomColor}`

    // select a mode at random from the dropdown list
    const randomModeIndex = Math.floor(Math.random() * modeOptions.length)
    modeOptions[randomModeIndex].checked = true
    selectDropdownOption()
    const randomMode = modeDropdownBtn.value

    const randomCount = Math.floor(Math.random() * 5) + 1
    generatorCount.dataset.count = randomCount
    generatorCount.innerText = randomCount
    
    // get a color scheme from the API
    colorSchemeObj = await getColorScheme(randomColor, randomMode, randomCount)
  }

  if (colorSchemeObj) renderColorScheme(colorSchemeObj)
}
initializeDisplay()