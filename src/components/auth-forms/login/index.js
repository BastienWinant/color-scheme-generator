export const loginEmailInput = document.querySelector('#login-email')
export const loginPasswordInput = document.querySelector('#login-password')
export const loginBtn = document.querySelector('#login-btn')
const cancelLoginBtn = document.querySelector('#cancel-login-btn')

export function openLoginModal() {
  document.querySelector('#login-modal').showModal()
}

export function closeLoginModal() {
  document.querySelector('#login-modal').close()
}
cancelLoginBtn.addEventListener('click', closeLoginModal)