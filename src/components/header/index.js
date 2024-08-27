import './style.css'
import logoImg from './pantone.svg'

const headerLogo = document.querySelector('#header-logo')
const navExpandBtn = document.querySelector('#nav-expand-btn')
const headerNavContainer = document.querySelector('#nav-container')
export const headerNav = document.querySelector('#nav')

export function showLoginState(user) {
  if (user) {
    headerNav.innerHTML = `
        <button type="button" id="nav-schemes-btn" class="nav-btn nav-schemes-btn">my schemes</button>
        <button type="button" id="nav-logout-btn" class="nav-btn nav-auth-btn">log out</button>`
  } else {
    headerNav.innerHTML = `
        <button type="button" id="nav-login-btn" class="nav-btn nav-auth-btn nav-login-btn">log in</button>
        <button type="button" id="nav-signup-btn" class="nav-btn nav-auth-btn">sign up</button>`
  }
}

function expandNav() {
  headerNavContainer.classList.add('nav-expanded')
}
navExpandBtn.addEventListener('click', expandNav)

function collapseNav() {
  headerNavContainer.classList.remove('nav-expanded')
}
headerNavContainer.addEventListener('click', collapseNav)
window.addEventListener('resize', collapseNav)

headerLogo.src = logoImg