import './style.css'

export const colorInput = document.querySelector('#color')
export const modeInput = document.querySelector('#mode')
export const modeInputText = document.querySelector('#dropdown-btn-text')
const modeDropdown = document.querySelector('#dropdown-options')
export const modeOptions = document.querySelectorAll('input[name="mode"]')
export const submitBtn = document.querySelector('#generator-form-submit-btn')

modeInput.addEventListener('click', e => {
  modeDropdown.classList.toggle('dropdown-expanded')
})

modeOptions.forEach(radioInput => {
  radioInput.addEventListener('click', e => {
    modeInputText.innerText = e.target.value
    modeDropdown.classList.remove('dropdown-expanded')
  })
})