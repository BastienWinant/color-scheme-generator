import './style.css'

import { onAuthStateChanged } from 'firebase/auth'

import(/* webpackPrefetch: true */ 'Components/auth/index')

import { auth, db } from 'Src/app'

// TODO: add an onAuthStateChanged listener