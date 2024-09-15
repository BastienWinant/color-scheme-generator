import './style.css'

import {
  generatorCollapseBtn,
  generatorSubmitBtn,
  generatorExpandBtn,
  collapseGeneratorForm,
  expandGeneratorForm
} from './form'

generatorCollapseBtn.addEventListener('click', collapseGeneratorForm)
generatorSubmitBtn.addEventListener('click', collapseGeneratorForm)
generatorExpandBtn.addEventListener('click', expandGeneratorForm)