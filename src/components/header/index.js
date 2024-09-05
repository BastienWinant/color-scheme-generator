export const header = document.querySelector('#header')
export const navExpandBtn = document.querySelector('#nav-expand-btn')
export const navContainer = document.querySelector('#nav-container')
export const navAuthExpandBtn = document.querySelector('#nav-auth-expand-btn')
export const navAuthContainer = document.querySelector('#nav-auth-btns-container')
export const navLoginBtn = document.querySelector('#nav-login-btn')
export const navSignupBtn = document.querySelector('#nav-signup-btn')

// EXPAND/COLLAPSE NAV
export function expandNav() {
  navContainer.classList.add('nav-expanded')
}
// navExpandBtn.addEventListener('click', expandNav)

export function collapseNav() {
  navContainer.classList.remove('nav-expanded')
}
// navContainer.addEventListener('click', e => {
//   if (!e.target.closest('.nav')) {
//     collapseNav()
//   }
// })

// EXPAND/COLLAPSE NAV AUTH
export function expandNavAuth() {
  navAuthContainer.classList.add('nav-auth-expanded')
}
// navAuthExpandBtn.addEventListener('click', expandNavAuth)

export function collapseNavAuth() {
  navAuthContainer.classList.remove('nav-auth-expanded')
}
// navAuthContainer.addEventListener('click', e => {
//   if (!e.target.closest('.nav-auth-btns')) {
//     collapseNavAuth()
//   }
// })

window.addEventListener('resize', () => {
  collapseNav()
  collapseNavAuth()
})