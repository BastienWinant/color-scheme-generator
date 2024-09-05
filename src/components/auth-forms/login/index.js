const cancelLoginBtn = document.querySelector('#cancel-login-btn')

export function openLoginModal() {
  document.querySelector('#login-modal').showModal()
}

function closeLoginModal() {
  document.querySelector('#login-modal').close()
}
cancelLoginBtn.addEventListener('click', closeLoginModal)