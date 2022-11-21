var admin  = require('firebase-admin')
//import * as functions from 'firebase-functions' (easier to use functions )
//TODO : add your config-file-for-your-project.json
var configSA = require('./config-file-for-your-project.json')

admin.initializeApp({
  credential: admin.credential.cert(configSA)
}) 
const db = admin.firestore()
export { admin, db }