import './style.css'

// HEADER
const navExpandBtn = document.querySelector('#nav-expand-btn')
const authExpandBtn = document.querySelector('#auth-expand-btn')
const navContainer = document.querySelector('#nav-container')
const userAuth = document.querySelector('#nav-auth-btns')

export const navLoginBtn = document.querySelector('#nav-login-btn')
export const navSignupBtn = document.querySelector('#nav-signup-btn')
export const navLogoutBtn = document.querySelector('#nav-logout-btn')

function expandNav() {
  navContainer.classList.add('expanded')
}

function collapseNav() {
  navContainer.classList.remove('expanded')
}

function collapseAuth() {
  userAuth.classList.remove('expanded')
}

function toggleAuth() {
  userAuth.classList.toggle('expanded')
}

navExpandBtn.addEventListener('click', expandNav)

// collapse nav when user clicks outside of it
navContainer.addEventListener('click', e => {
  const isNav = e.target.closest('.nav')

  if (!isNav) {
    collapseNav()
  }
})
authExpandBtn.addEventListener('click', toggleAuth)

// collapse upon window resize
window.addEventListener('resize', () => {
  collapseNav()
  collapseAuth()
})