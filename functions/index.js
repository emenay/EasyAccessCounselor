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

const copyStudent = (snap, context) => {
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
const deleteStudent = (snap, context) => {
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

// TODO: Delete after creating "Reassign Counselor" functionality

// const updateStudent = (change, context) => {
//   const { firstName, lastName, uid, cuid } = change.after.data();
//   const oldCuid = change.before.data().cuid;
//   // Delete student profile from old counselor if counselor changed
//   if (oldCuid && (cuid !== oldCuid)) {
//     db
//       .collection('counselors')
//       .doc(oldCuid)
//       .collection('students')
//       .doc(uid)
//       .delete()
//       .catch(console.error);
//   }
//   // Create copy of student under new counselor
//   if (cuid) {
//     return db
//     .collection('counselors')
//     .doc(cuid)
//     .collection('students')
//     .doc(uid)
//     .set({
//       firstName,
//       lastName,
//       uid
//     })
//     .catch(console.error);
//   }
// }

module.exports = {
  onCreateStudent: functions.firestore.document('students/{studentId}').onCreate(copyStudent),
  onDeleteStudent: functions.firestore.document('students/{studentId}').onDelete(deleteStudent)
};

  // onUpdateStudent: functions.firestore.document('students/{studentId}').onUpdate(updateStudent)