const functions = require('firebase-functions');

const app = require('express')();

const FBAuth = require('./util/fbAuth');
const { db } = require('./util/admin');

const {
    getAllScreams,
    postOneScream,
    getScream,
    commentOnScreen,
    likeScream,
    unlikeScream,
    deleteScream
} = require('./handlers/screams');
const {
    signup,
    login,
    uploadImage,
    addUserDetails,
    getAuthenticatedUser,
    getUserDetails,
    markNotificationsRead
} = require('./handlers/users');



//scream routes
app.get('/screams', getAllScreams);
app.post('/scream', FBAuth, postOneScream);
app.get('/screams/:screamId', getScream);
app.post('/screams/:screamId/comment', FBAuth,commentOnScreen);
app.get('/screams/:screamId/like', FBAuth, likeScream);
app.get('/screams/:screamId/unlike', FBAuth, unlikeScream);
app.delete('/screams/:screamId', FBAuth, deleteScream);


// Users route
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);
app.get('/user/:handle', getUserDetails);
app.post('/notifications', FBAuth, markNotificationsRead);

exports.api = functions.https.onRequest(app);

exports.createNotificationOnLike = functions.firestore.document('likes/{id}')
    .onCreate(snapshot => {
       db.doc(`/screams/${snapshot.data().screamId}`)
           .get().then(doc => {
               if(doc.exists) {
                   return db.doc(`/notifications/${snapshot.id}`).set({
                       createdAt: new Date().toISOString(),
                       recipient: doc.data().userHandle,
                       sender: snapshot.data().userHandle,
                       type: 'like',
                       read: 'false',
                       screamId: doc.id
                   });
               }
       })
           .then(() => {
               return;
           })
           .catch(err => {
               console.error(err);
               return;
           });
    });

exports.deleteNotificationOnUnlike = functions.firestore.document('likes/{id}')
    .onDelete((snapshot => {
        db.doc(`/notifications/${snapshot.id}`)
            .delete()
            .then(() => {
                return;
            })
            .catch(err => {
                console.log(err);
                return;
            })
    }));

exports.createNotificationOnComment = functions.firestore.document('comments/{id}')
    .onCreate(snapshot => {
        db.doc(`/screams/${snapshot.data().screamId}`)
            .get().then(doc => {
            if(doc.exists) {
                return db.doc(`/notifications/${snapshot.id}`).set({
                    createdAt: new Date().toISOString(),
                    recipient: doc.data().userHandle,
                    sender: snapshot.data().userHandle,
                    type: 'comment',
                    read: 'false',
                    screamId: doc.id
                });
            }
        })
            .then(() => {
                return;
            })
            .catch(err => {
                console.error(err);
                return;
            });
    });