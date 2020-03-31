const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

exports.addMessage = functions.https.onCall((data, context) => {
    console.log(data, context);
    sendEmail()
});

async function  sendEmail() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    pool: true,
    host: "mail.selfisolationhelp.co.uk",
    port: 465,
    secure: true, // use TLS
    auth: {
      user: "volunteers@selfisolationhelp.co.uk",
      pass: ""
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <volunteers@selfisolationhelp.co.uk>', // sender address
    to: "contactstevebrown@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  });

}

sendEmail().catch(console.error);