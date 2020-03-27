const admin = require('firebase-admin');
var serviceAccount = require("../../../Documents/serviceAccountKey");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://twitterapp-1ee11.firebaseio.com",
    storageBucket: "twitterapp-b20ba.appspot.com"
});
// admin.initializeApp();

const db = admin.firestore();


module.exports = { admin, db };
