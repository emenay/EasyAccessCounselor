const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

/**
 * Makes a copy of a student's document under their corresponding counselor
 *
 * @param {Object} change Contains the before and after state of a student's doc.
 * @param {Object} context Details about the event.
 */

const copyProfile = (snap, context) => {
  const { firstName, lastName, uid, cuid } = snap.data();

  if (cuid) {
    return db
      .collection('counselors')
      .doc(cuid)
      .collection('students')
      .doc(uid)
      .set({
          firstName,
          lastName,
          uid
      })
      .catch(console.error);
  } else {
    return;
  }
};

// TODO: functions for onDelete and onUpdate

module.exports = {
  copyOnWrite: functions.firestore.document('students/{studentId}').onCreate(copyProfile)
};