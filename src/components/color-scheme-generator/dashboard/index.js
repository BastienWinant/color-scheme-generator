import './style.css'

export const formatOptions = document.querySelectorAll('input[name="format"]')
export const saveSchemeBtn = document.querySelector('#save-scheme-btn')
const generateCssBtn = document.querySelector('#generate-scheme-btn')

function generateSchemeCSS() {
  console.log('generating CSS...')
}
generateCssBtn.addEventListener('click', generateSchemeCSS)