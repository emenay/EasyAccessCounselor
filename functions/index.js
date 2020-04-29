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
  }
};

// Deletes a student's profile under a counselor if the student is deleted from the Students collection
const deleteProfile = (snap, context) => {
  const { uid, cuid } = snap.data();

  if (cuid) {
    const studentProfile = db.collection('counselors').doc(cuid).collection('students').doc(uid);
    if (studentProfile) {
      return studentProfile
        .delete()
        .catch(console.error);
    }
  }
}

// TODO: function for onUpdate

module.exports = {
  onStudentCreate: functions.firestore.document('students/{studentId}').onCreate(copyProfile),
  onStudentDelete: functions.firestore.document('students/{studentId}').onDelete(deleteProfile)
};