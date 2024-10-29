import './index.css'

const generatorColorInput = document.querySelector('#generator-color-input')
const generatorDropdownBtn = document.querySelector('#generator-dropdown-btn')
const generatorColorCount = document.querySelector('#generator-count')
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