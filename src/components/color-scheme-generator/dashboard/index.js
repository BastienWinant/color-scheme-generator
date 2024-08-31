import './style.css'

export const formatOptions = document.querySelectorAll('input[name="format"]')
const saveSchemeBtn = document.querySelector('#save-scheme-btn')
const generateCssBtn = document.querySelector('#generate-scheme-btn')

function saveScheme() {
  const scheme = JSON.parse(localStorage.getItem('gcs-scheme'))
  console.log(scheme)
}
saveSchemeBtn.addEventListener('click', saveScheme)

function generateSchemeCSS() {
  console.log('generating CSS...')
}
generateCssBtn.addEventListener('click', generateSchemeCSS)