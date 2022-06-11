/* eslint-disable */
import * as functions from "firebase-functions";

// The Firebase Admin SDK to access Firestore.
/* const admin = require("firebase-admin"); */
import * as admin from "firebase-admin";
admin.initializeApp();

exports.registerUserData = functions.auth.user().onCreate((user) => {
  console.log(user.uid);
  admin.auth().setCustomUserClaims(user.uid, { admin: true });
});
