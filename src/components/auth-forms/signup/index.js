const cancelSignupBtn = document.querySelector('#cancel-signup-btn')

export function openSignupModal() {
  document.querySelector('#signup-modal').showModal()
}

function closeSignupModal() {
  document.querySelector('#signup-modal').close()
}
cancelSignupBtn.addEventListener('click', closeSignupModal)