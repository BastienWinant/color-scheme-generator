import './index.css'
import { auth, db } from './app'

import { connectAuthEmulator } from 'firebase/auth'
import { connectDatabaseEmulator } from 'firebase/database'

if (process.env.NODE_ENV !== 'production') {
  connectAuthEmulator(auth, "http://127.0.0.1:9099")
  connectDatabaseEmulator(db, "127.0.0.1", 9000)

  console.log('Looks like we are in development mode!')
}