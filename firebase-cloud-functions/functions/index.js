const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

exports.sendEmailToVolunteersMatchingIsolator = functions.https.onCall(
  (data, context) => {
    sendEmailToVolunteersMatchingIsolator(data.emails, data.isolator);
  }
);

exports.volunteerConfirmationEmail = functions.https.onCall((data, context) => {
  volunteerConfirmationEmail(data.email);
});

async function sendEmailToVolunteersMatchingIsolator(emails, isolator) {
  let transporter = nodemailer.createTransport({
    pool: true,
    host: "mail.selfisolationhelp.co.uk",
    port: 465,
    secure: true, // use TLS
    auth: {
      user: "volunteers@selfisolationhelp.co.uk",
      pass: functions.config().webmail.password
    }
  });

  // send mail with defined transport object
  let sendEmail = await transporter
    .sendMail({
      from: '"Self Isolation Help" <volunteers@selfisolationhelp.co.uk>',
      bcc: emails, // list of receivers
      subject: "You have been matched with a self-isolator",
      html: `
      <p>Dear Volunteer</p>
      <p>You may have been matched with a self-isolator</p>
      <p><b>Details:</b></p>
     
      ${isolator.info.needsFood ? "<p>Needs food</p>" : ""}
      ${
        isolator.info.needsSomeoneToTalkTo
          ? "<p>Needs someone to talk to</p>"
          : ""
      }
      ${isolator.info.needsMedicine ? "<p>Needs medicine</p>" : ""}
      <p>${
        isolator.info.needsSomethingElseDescription
          ? isolator.info.needsSomethingElseDescription
          : ""
      }</p>
      <p>${isolator.moreInfo ? isolator.moreInfo : ""}</p>
      
      <p>=============================</p>
      <p><b>Location:</b></p>
      <p>${
        isolator.details.selectedLocation.name
          ? isolator.details.selectedLocation.name
          : ""
      }</p>
      <p>${isolator.details.county}</p>
      <p></p>
      
      <p>=============================</p>
      <p><b>To get in touch with this person</b>, please click the link below (you will need to in logged in first)</p>
      <p>Please remember to mark them as "pending" after you are in touch and "resolved" after they have been helped.</p>
      <p><a href="http://localhost:8100/isolator?id=${
        isolator.id
      }">Click to view self isolator</a></p>
      <p>Although this is an automated email, you may reply to get in touch with our co-ordinating team.</p>
      <p></p>
      <p>Thank you,</p>
      <p>Self Isolation Help Uk</p>
    `
    })
    .then(() => {
      console.log("VOLUNTEER MATCH EMAIL SUCCESSFULLY SENT", emails, isolator);
    });
}

async function volunteerConfirmationEmail(email) {
  let transporter = nodemailer.createTransport({
    pool: true,
    host: "mail.selfisolationhelp.co.uk",
    port: 465,
    secure: true, // use TLS
    auth: {
      user: "volunteers@selfisolationhelp.co.uk",
      pass: functions.config().webmail.password
    }
  });

  // send mail with defined transport object
  let sendEmail = await transporter
    .sendMail({
      from: '"Self Isolation Help" <volunteers@selfisolationhelp.co.uk>',
      bcc: email, // list of receivers
      subject:
        "Self Isolation Help UK - Your volunteer application has been approved",
      html: `
      <p>Dear Volunteer,</p>
      <p>Your application has now been approved.</p>
      <p>You may now login to the Self Isolation Help tool to view Self-isolators in your local area.</p>
      <p>You will also now receive email notifications when a new match is found.</p>
      <p><a href="https://selfisolationhelp.co.uk/people-isolating">Click here to view</a>.</p>
      <p>This is an automated email. If you have any questions or queries, please reply to this email to speak to a human.</p>
      <p>Thank you,</p>
      <p>Self Isolation Help Uk</p>
    `
    })
    .then(() => {
      console.log(
        "VOLUNTEER APPROVAL CONFIRMATION EMAIL SUCCESSFULLY SENT",
        email
      );
    });
}

sendEmailToVolunteersMatchingIsolator().catch(console.error);
volunteerConfirmationEmail().catch(console.error);
