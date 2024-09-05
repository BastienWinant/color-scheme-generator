export const signupEmailInput = document.querySelector('#signup-email')
export const signupPasswordInput = document.querySelector('#signup-password')
export const signupBtn = document.querySelector('#signup-btn')
const cancelSignupBtn = document.querySelector('#cancel-signup-btn')

export function openSignupModal() {
  document.querySelector('#signup-modal').showModal()
}

export function closeSignupModal() {
  document.querySelector('#signup-modal').close()
}
cancelSignupBtn.addEventListener('click', closeSignupModal)