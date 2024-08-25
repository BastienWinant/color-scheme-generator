import './style.css'

export const colorInput = document.querySelector('#color')
export const modeDropdownBtn = document.querySelector('#mode-dropdown-btn')
const modeDropdown = document.querySelector('#mode-dropdown')
export const modeOptions = document.querySelectorAll('input[name="mode"]')
export const countInput = document.querySelector('#count')
export const submitBtn = document.querySelector('#submit')

modeDropdownBtn.addEventListener('click', e => {
  modeDropdown.classList.toggle('dropdown-expanded')
})

modeOptions.forEach(optionEl => {
  optionEl.addEventListener('click', e => {
    modeDropdownBtn.innerText = e.target.value
  })
})