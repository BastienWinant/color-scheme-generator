import './index.css'

const generatorColorInput = document.querySelector('#generator-color-input')
const generatorDropdownBtn = document.querySelector('#generator-dropdown-btn')
const generatorModeInputs = document.querySelectorAll('input[name="mode"]')
const generatorColorCount = document.querySelector('#generator-count')
const decreaseCountBtn = document.querySelector('#decrease-count-btn')
const increaseCountBtn = document.querySelector('#increase-count-btn')
export const getSchemeBtn = document.querySelector('#get-scheme-btn')
const saveSchemeBtn = document.querySelector('#save-scheme-btn')

const gatherFormInputs = () => {
  const seedColor = generatorColorInput.value
  const schemeMode = generatorDropdownBtn.value
  const schemeCount = generatorColorCount.innerText

  return [seedColor, schemeMode, schemeCount]
}

const getColorScheme = async (hex, mode, count) => {
  const baseUrl = 'https://www.thecolorapi.com'
  const endPoint = 'scheme'

  const requestUrl = `${baseUrl}/${endPoint}?hex=${hex.slice(1,)}&mode=${mode}&count=${count}`

  const response = await fetch(requestUrl)
  const data = response.json()

  return data
}

export const requestColorScheme = async () => {
  const [color, mode, count] = gatherFormInputs()
  const schemeObj = await getColorScheme(color, mode, count)

  return schemeObj
}

generatorModeInputs.forEach(inputEl => {
  inputEl.addEventListener('click', e => {
    const mode = e.target.value
    generatorDropdownBtn.innerText = mode
    generatorDropdownBtn.value = mode

  })
})

decreaseCountBtn.addEventListener('click', () => {
  const currentCount = parseInt(generatorColorCount.dataset.value)
  const newCount = currentCount - 1

  generatorColorCount.dataset.value = newCount
  generatorColorCount.innerText = newCount

  increaseCountBtn.disabled = false
  if (newCount === 1) {
    decreaseCountBtn.disabled = true
  }
})

increaseCountBtn.addEventListener('click', () => {
  const currentCount = parseInt(generatorColorCount.dataset.value)
  const newCount = currentCount + 1

  generatorColorCount.dataset.value = newCount
  generatorColorCount.innerText = newCount

  decreaseCountBtn.disabled = false
  if (newCount === 6) {
    increaseCountBtn.disabled = true
  }
})