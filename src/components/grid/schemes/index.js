import '../index.css'

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'Src/app'
import { getUserSchemes, deleteScheme } from 'Src/db_utils'
import { openLoginModal, openSignupModal } from 'Components/auth'

const schemeGrid = document.querySelector('#scheme-grid')

const showAuthPlaceholder = () => {
  schemeGrid.innerHTML = `
    <div class="grid-placeholder">
      <p class="grid-placeholder-text">Tell us who you are and we'll paint your rainbow...</p>
      <div class="grid-placeholder-btns">
        <button class="grid-placeholder-btn grid-login-btn" type="button">log in</button>
        <button class="grid-placeholder-btn grid-signup-btn" type="button">sign up</button>
      </div>
    </div>`
}

const showNoDataPlaceholder = () => {
  schemeGrid.innerHTML = `
    <div class="grid-placeholder">
      <p class="grid-placeholder-text">It's looking a little bland in here...</p>
      <a href="./index.html" class="grid-placeholder-link">
        <i class="fa-solid fa-circle-plus"></i>
        <p>Let's add some color!</p>
      </a>
    </div>`
}

const renderSchemeGrid = (userSchemes) => {
  let htmlStr = ''
  for (const [key, schemeObj] of Object.entries(userSchemes)) {
    htmlStr += `
      <figure class="card" data-id="${key}">
        <img src="${schemeObj.image.bare}" class="card-img" />
        <figcaption class="card-body">
          <button type="button" class="card-view-btn">view</button>
          <button type="button" class="card-delete-btn">delete</button>
        </figcaption>
      </figure>\n`
  }

  schemeGrid.innerHTML = htmlStr
}

const updateSchemeGrid = async () => {
  const userSchemes = await getUserSchemes()

  if (Object.keys(userSchemes).length) {
    renderSchemeGrid(userSchemes)
  } else {
    showNoDataPlaceholder()
  }
}

schemeGrid.addEventListener('click', e => {
  if (e.target.classList.contains('card-delete-btn')) {
    const userId = auth.currentUser.uid
    const schemeKey = e.target.closest('.card').dataset.id
    deleteScheme(schemeKey, userId)
    updateSchemeGrid()
  } else if (e.target.classList.contains('card-view-btn')) {
    console.log('viewing')
  } else if (e.target.classList.contains('grid-login-btn')) {
    openLoginModal()
  } else if (e.target.classList.contains('grid-signup-btn')) {
    openSignupModal()
  }
})

const monitorAuthState = async () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      updateSchemeGrid()
    } else {
      showAuthPlaceholder()
    }
  })
}

monitorAuthState()