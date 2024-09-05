import './style.css'

export const header = document.querySelector('#header')
const navContainer = document.querySelector('#nav-container')
const navAuthContainer = document.querySelector('#nav-auth-btns-container')
const navAuthBtns = document.querySelector('#nav-auth-btns')
export const navLoginBtn = document.querySelector('#nav-login-btn')
export const navSignupBtn = document.querySelector('#nav-signup-btn')
export const navLogoutBtn = document.querySelector('#nav-logout-btn')

// EXPAND/COLLAPSE NAV
export function expandNav() {
  navContainer.classList.add('nav-expanded')
}

export function collapseNav() {
  navContainer.classList.remove('nav-expanded')
}

// EXPAND/COLLAPSE NAV AUTH
export function expandNavAuth() {
  navAuthContainer.classList.add('nav-auth-expanded')
}

export function collapseNavAuth() {
  navAuthContainer.classList.remove('nav-auth-expanded')
}

export function showLoginState(user) {
  if (user) {
    navAuthBtns.innerHTML = `
      <button type="button" id="nav-logout-btn" class="nav-btn nav-logout-btn">log out</button>`
  } else {
    navAuthBtns.innerHTML = `
      <button type="button" id="nav-login-btn" class="nav-btn">log in</button>
      <button type="button" id="nav-signup-btn" class="nav-btn nav-signup-btn">sign up</button>`
  }
}