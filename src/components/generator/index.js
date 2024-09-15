import './style.css'

const generatorForm = document.querySelector('#generator-form')

const generatorInputs = document.querySelector('#generator-inputs')
const generatorCollapseBtn = document.querySelector('#generator-collapse-btn')
const generatorSubmitBtn = document.querySelector('#generator-submit-btn')

const schemeControlBtns = document.querySelector('#scheme-ctrl-btns')
const generatorExpandBtn = document.querySelector('#generator-expand-btn')
const generatorSaveBtn = document.querySelector('#generator-save-btn')

function collapseGeneratorForm(e) {
  e.preventDefault()

  generatorInputs.classList.remove('generator-fieldset-expanded')
  schemeControlBtns.classList.add('generator-fieldset-expanded')
}
generatorCollapseBtn.addEventListener('click', collapseGeneratorForm)
generatorSubmitBtn.addEventListener('click', collapseGeneratorForm)

function expandGeneratorForm(e) {
  e.preventDefault()

  generatorInputs.classList.add('generator-fieldset-expanded')
  schemeControlBtns.classList.remove('generator-fieldset-expanded')
}
generatorExpandBtn.addEventListener('click', expandGeneratorForm)