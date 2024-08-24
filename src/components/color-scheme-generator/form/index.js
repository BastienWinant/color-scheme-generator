const colorInput = document.querySelector('#color')
const modeInput = document.querySelector('#mode')
const countInput = document.querySelector('#count')
const submitBtn = document.querySelector('#submit')

submitBtn.addEventListener('click', e => {
  e.preventDefault()

  const color = colorInput.value
  const mode = colorInput.value
  const count = colorInput.value

  const baseURL = "https://www.thecolorapi.com"
  const endpoint = "scheme"
  const requestURL = `${baseURL}/${endpoint}?hex=${color}&mode=${mode}&count=${count}`

  fetch(requestURL)
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
})