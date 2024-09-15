import './style.css'

export const generatorForm = document.querySelector('#generator-form')

export const generatorInputs = document.querySelector('#generator-inputs')
export const generatorCollapseBtn = document.querySelector('#generator-collapse-btn')
export const generatorSubmitBtn = document.querySelector('#generator-submit-btn')

export const schemeControlBtns = document.querySelector('#scheme-ctrl-btns')
export const generatorExpandBtn = document.querySelector('#generator-expand-btn')
export const generatorSaveBtn = document.querySelector('#generator-save-btn')

export function collapseGeneratorForm(e) {
  e.preventDefault()

  generatorInputs.classList.remove('generator-fieldset-expanded')
  schemeControlBtns.classList.add('generator-fieldset-expanded')
}

export function expandGeneratorForm(e) {
  e.preventDefault()

  generatorInputs.classList.add('generator-fieldset-expanded')
  schemeControlBtns.classList.remove('generator-fieldset-expanded')
}