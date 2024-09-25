import './style.css'

import { connectAuthEmulator } from 'firebase/auth'
import { connectDatabaseEmulator } from 'firebase/database'

import(/* webpackPrefetch: true */ 'Components/header')

import { auth, db } from './app'

if (process.env.NODE_ENV !== 'production') {
  connectAuthEmulator(auth, "http://localhost:9099")
  connectDatabaseEmulator(db, "127.0.0.1", 9000)
  console.log('Looks like we are in development mode!')
}