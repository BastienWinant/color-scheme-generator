import './style.css'

import { updateDisplay } from '../display'

const colorInput = document.querySelector('#color')
const modeInput = document.querySelector('#mode')
const countInput = document.querySelector('#count')
const submitBtn = document.querySelector('#submit')

submitBtn.addEventListener('click', e => {
  e.preventDefault()

  const color = colorInput.value.slice(1,)
  localStorage.setItem('gcs-color-hex', color)
  
  const mode = colorInput.value
  localStorage.setItem('gcs-color-mode', mode)

  const count = colorInput.value
  localStorage.setItem('gcs-color-count', count)

  updateDisplay()
})