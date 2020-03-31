const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });
admin.initializeApp();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "volunteers@selfisolationhelp.co.uk",
    pass: "yourgmailaccpassword"
  }
});

exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
      
    //TODO check both args passed and populated before proceeding

    const dest = req.query.dest;
    const type = req.query.dest;
    const key = key = functions.config().secure_token.key;
    const requestKey = request.get('key');

    if(key === requestKey)
    {
      const emailSubject;
    const emailBody;
    if(type === "1") // volunteer accept
    {
        emailSubject = 'Volunteer application ACCEPTED'
        emailBody  =  `<p style="font-size: 16px;">You have been accepted as volunteer</p><br />
        <img src="https://images.prod.meredith.com/product/fc8754735c8a9b4aebb786278e7265a5/1538025388228/l/rick-and-morty-pickle-rick-sticker" />`
    }
    
    const mailOptions = {
      from: "Your Account Name <yourgmailaccount@gmail.com>", // Something like: Jane Doe <janedoe@gmail.com>
      to: dest,
      subject: emailSubject,
      html: emailBody
    };

    // returning result
    return transporter.sendMail(mailOptions, (erro, info) => {
      if (erro) {
        return res.send(erro.toString());
      }
      return res.send("Sended");
    });
    }
    else
    {
      //TODO invalid request - do not send email
    }
  });
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
