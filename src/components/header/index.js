export const header = document.querySelector('#header')
const navContainer = document.querySelector('#nav-container')
const navAuthContainer = document.querySelector('#nav-auth-btns-container')
export const navLoginBtn = document.querySelector('#nav-login-btn')
export const navSignupBtn = document.querySelector('#nav-signup-btn')

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