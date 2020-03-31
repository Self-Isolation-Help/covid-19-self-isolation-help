const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

exports.addMessage = functions.https.onCall((data, context) => {
  // ...
});

// exports.emailMessage = args => {
//   const transport = nodemailer.createTransport({
//     service: "",
//     auth: {
//       user: "volunteers@selfisolationhelp.co.uk",
//       pass: " ! ! password goes here ! ! "
//     }
//   });
//   const mailOptions = {
//     from: "volunteers@selfisolationhelp.co.uk",
//     to: args.email,
//     subject: "Isolation Help - Applicattion ACCEPTED",
//     html: "Need some text here........"
//   };
//   transport.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       //TODO email failed
//     }
//     //TODO email success
//   });
// };
//
// exports.updatingVolunteer = functions.database
//   .ref("/volunteer/{id}")
//   .onUpdate((change, context) => {
//     const agreebefore = change.before.child("volunteer").val();
//     const agreeAfter = change.after.child("volunteer").val();
//     const email; //TODO get email for voluteer
//
//     if (
//       (agreebefore === null && agreeAfter === true) ||
//       (agreebefore === failse && agreeAfter == true)
//     ) {
//       this.emailMessage(email);
//     }
//   });
