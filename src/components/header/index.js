import './style.css'

const navExpandBtn = document.querySelector('#nav-expand-btn')
const headerNavContainer = document.querySelector('#nav-container')
export const headerNav = document.querySelector('#nav')

export function showLoginState(user) {
  if (user) {
    headerNav.innerHTML = `
      <div class='header-auth-btns'>
        <button type="button" id="nav-logout-btn" class="nav-btn header-auth-btn">log out</button>
      </div>`
  } else {
    headerNav.innerHTML = `
      <div class='header-auth-btns'>
        <button type="button" id="nav-login-btn" class="nav-btn nav-auth-btn">log in</button>
        <button type="button" id="nav-signup-btn" class="nav-btn nav-auth-btn nav-signup-btn">sign up</button>
      </div>`
  }
}

function expandNav() {
  headerNavContainer.classList.add('nav-expanded')
}

function collapseNav() {
  headerNavContainer.classList.remove('nav-expanded')
}

navExpandBtn.addEventListener('click', expandNav)

headerNavContainer.addEventListener('click', e => {
  if (!e.target.closest('#nav')) {
    collapseNav()
  }
})

window.addEventListener('resize', collapseNav)