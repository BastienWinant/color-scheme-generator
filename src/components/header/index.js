import './style.css'

export const headerNav = document.querySelector('#nav')

export function showLoginState(user) {
  if (user) {
    headerNav.innerHTML = `
      <button type="button" id="nav-logout-btn">log out</button>`
  } else {
    headerNav.innerHTML = `
      <button type="button" id="nav-login-btn">log in</button>
      <button type="button" id="nav-signup-btn">sign up</button>`
  }
}