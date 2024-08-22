import './style.css'

// HEADER
const navExpandBtn = document.querySelector('#nav-expand-btn')
const navContainer = document.querySelector('#nav-container')
const nav = document.querySelector('#nav')

function expandNav() {
  navContainer.classList.add('expanded')
}

function collapseNav() {
  navContainer.classList.remove('expanded')
}

navExpandBtn.addEventListener('click', expandNav)
window.addEventListener('resize', collapseNav)

navContainer.addEventListener('click', e => {
  const isNav = e.target.closest('.nav')

  if (!isNav) {
    collapseNav()
  }
})