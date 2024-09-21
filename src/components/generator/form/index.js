export const colorInput = document.querySelector('#color')
export const dropdownBtn = document.querySelector('#dropdown-btn')
const dropdownBtnText = document.querySelector('#dropdown-btn span')
export const dropdownOptions = document.querySelectorAll('input[name="mode"]')
export const getSchemeBtn = document.querySelector('#get-scheme-btn')

const newSchemeBtn = document.querySelector('#new-scheme-btn')
export const saveSchemeBtn = document.querySelector('#save-scheme-btn')

export const selectDropdownOption = () => {
  const optionValue = document.querySelector('input[name="mode"]:checked').value
    
  dropdownBtn.value = optionValue
  dropdownBtnText.textContent = optionValue
}

export const getColorScheme = async (color, mode) => {
  const baseUrl = 'https://www.thecolorapi.com'
  const endpoint = 'scheme'

  const requestUrl = `${baseUrl}/${endpoint}?hex=${color}&mode=${mode}&count=5`

  try {
    const res = await fetch(requestUrl)
    const data = await res.json()
    return data
  } catch (error) {
    return
  }
}