import '../style.css'

import checkMark from './check-single.svg'

export const generatorForm = document.querySelector('#generator-form')
export const colorInput = document.querySelector('#color')
export const modeInput = document.querySelector('#mode')
const modeInputText = document.querySelector('#dropdown-btn-text')
const modeDropdown = document.querySelector('#mode-options')
export const modeOptions = document.querySelectorAll('input[name="mode"]')
const modeOptionValues = document.querySelectorAll('input[name="mode"] + span')
export const submitBtn = document.querySelector('#submit')

// hide dropdown options
export function collapseModeDropdown() {
  modeDropdown.classList.remove('dropdown-expanded')
}

// show/hide dropdown options
export function toggleModeDropdown() {
  modeDropdown.classList.toggle('dropdown-expanded')
}

// make user selection visible in the dropdown
export function selectMode() {
  // remove all checkmarks
  modeOptionValues.forEach(spanEl => {
    const imgEl = spanEl.querySelector('img')

    if (imgEl) {
      imgEl.remove()
    }
  })

  // add checkmark to the selected mode
  document.querySelector('input[name="mode"]:checked + span')
            .innerHTML +=
              `<img src="${checkMark}" alt="checkmark icon" class="checkmark-img">`

  // show the selected mode in the dropdown button
  const selectedMode = document.querySelector('input[name="mode"]:checked').value
  modeInput.value = selectedMode.toLowerCase()
  modeInputText.innerText = selectedMode
}