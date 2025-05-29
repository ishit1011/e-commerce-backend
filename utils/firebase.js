const admin = require('firebase-admin');
const serviceAccount = require('./firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// async function generateToken() {
//   const customToken = await admin.auth().createCustomToken("some-uid");
//   console.log("Custom Token:", customToken);
// }

// generateToken();

module.exports = admin;
