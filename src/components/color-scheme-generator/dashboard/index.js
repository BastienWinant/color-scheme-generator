import './style.css'

export const formatOptions = document.querySelectorAll('input[name="format"]')
export const saveSchemeBtn = document.querySelector('#save-scheme-btn')
const generateCssBtn = document.querySelector('#generate-css-btn')

export function getSelectedFormat() {
  return document.querySelector('input[name="format"]:checked').value
}
function generateSchemeCSS() {
  const schemeData = JSON.parse(localStorage.getItem('gcs-scheme'))
  const schemeColors = schemeData.colors

  console.log(schemeColors.map(colorObj => {
    const varName = colorObj.name.value.toLowerCase().replace(' ', '-')
    const varValue = colorObj.hex.value

    return `--${varName}: ${varValue};`
  }).join('\n'))
}
generateCssBtn.addEventListener('click', generateSchemeCSS)