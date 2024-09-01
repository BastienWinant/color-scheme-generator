import './style.css'

import { ref, child, push, update } from "firebase/database"

import { firebaseAuth, firebaseDB } from '../../../app'

export const formatOptions = document.querySelectorAll('input[name="format"]')
const saveSchemeBtn = document.querySelector('#save-scheme-btn')
const generateCssBtn = document.querySelector('#generate-scheme-btn')

function saveScheme() {
  const schemeData = JSON.parse(localStorage.getItem('gcs-scheme'))

  if (firebaseAuth.currentUser) {
    // retrieve the logged user ID
    const userId = firebaseAuth.currentUser.uid

    // Get a key for a new scheme
    const newSchemeKey = push(child(ref(firebaseDB), 'schemes')).key

    // Write the new post's data simultaneously in the schemes list and the user's scheme list.
    const updates = {};
    updates['/schemes/' + newSchemeKey] = schemeData
    updates['/user-schemes/' + userId + '/' + newSchemeKey] = schemeData

    return update(ref(firebaseDB), updates);
  } else {
    // TODO: open the login modal
  }
}
saveSchemeBtn.addEventListener('click', saveScheme)

function generateSchemeCSS() {
  console.log('generating CSS...')
}
generateCssBtn.addEventListener('click', generateSchemeCSS)