import './style.css'

import { auth, db } from 'Src/app'

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}