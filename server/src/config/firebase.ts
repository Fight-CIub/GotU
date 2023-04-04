import admin from 'firebase-admin'
import { firebaseCredentials } from './firebaseCredentials'

const firebase = admin.initializeApp({
  credential: admin.credential.cert(firebaseCredentials as admin.ServiceAccount),
  databaseURL:
    'https://gotu-a9604-default-rtdb.europe-west1.firebasedatabase.app/',
})

export default firebase
