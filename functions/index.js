const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

/*
Stripe
*/

// TODO: Remember to set token using >> firebase functions:config:set stripe.token="SECRET_STRIPE_TOKEN_HERE"
const stripe = require('stripe')(functions.config().stripe.token);

// function charge(req, res) {
//     const body = JSON.parse(req.body);
//     const token = body.token.id;
//     const amount = body.charge.amount;
//     const currency = body.charge.currency;

//     // Charge card
//     stripe.charges.create({
//         amount,
//         currency,
//         description: 'Firebase Example',
//         source: token,
//     }).then(charge => {
//         send(res, 200, {
//             message: 'Success',
//             charge,
//         });
//     }).catch(err => {
//         console.log(err);
//         send(res, 500, {
//             error: err.message,
//         });
//     });
// }

// const syncUserToStripe = functions.auth.user().onCreate(async (data, context) => {
//   const stripe = new Stripe('pk_test_51HbCkNKXiwGLHCkWpDi19gHbPGMLeIFUspxD6TlwmUGj6cqaYnYozd0wSdNqOy0mTJzHOjO2KoIWr9IGEGMgjZgc00zgDleSC8'); // Initialize the stripe SDK
//   const stripeCustomer = await stripe.customers.create({
//         email: data.email
//   }); // Now you have the stripe customer. Maybe you would like to save the stripeCustomer Id to database/firestore
//   console.log(`Done syncing firestore user with id: ${data.uid} to Stripe. The stripe id is ${stripeCustomer.id}`);
// }
// );

exports.createStripeCustomer = functions.auth.user().onCreate(async (user) => {
  const customer = await stripe.customers.create({ email: user.email });
  await admin.firestore().collection('customers').doc(user.uid).set({
    customer_id: customer.id,
  });
  return;
});

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


const emailCode = (snap, context) => {  
    const { email } = snap.data();
    db.collection('mail').add({
    to: email,
    message: {
      subject: 'Hello from Firebase!',
      html: 'This is an <code>HTML</code> email body.: ' + 
       ' ' + context.params.cohortCode,
    },
  })
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
  onDeleteStudent: functions.firestore.document('students/{studentId}').onDelete(deleteStudent),
  onEmailCode: functions.firestore.document('cohortCode/{cohortCode}').onCreate(emailCode)
};

  // onUpdateStudent: functions.firestore.document('students/{studentId}').onUpdate(updateStudent)