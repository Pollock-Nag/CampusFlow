// npm i nodemailer mailgen
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require('dotenv').config();
const ENV = process.env;

module.exports = talentRequest = async (req, res) => {
  let config = {
    service: 'gmail',
    auth: {
      user: ENV.EMAIL,
      pass: ENV.PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Project Code Talent',
      link: 'talent.projectcode.me',
    },
  });

  const {
    talentId,
    talentName,
    hrName,
    hrEmail,
    hireType,
    whenNeeded,
    contactNo,
    companyName,
    stack,
    frontendSkills,
    backendSkills,
    industries,
  } = req.body;

  const response = {
    body: {
      name: 'Project Code',
      intro: 'Request for Talent Acquisition',
      action: {
        instructions:
          'This HR has requested for your talent. Please contact them at the email below.' +
          '<br><br>' +
          'HR Name: ' +
          hrName +
          '<br>' +
          'HR Email: ' +
          hrEmail +
          '<br>' +
          'Contact No: ' +
          contactNo +
          '<br>' +
          'Company Name: ' +
          companyName +
          '<br><br>' +
          'Selected Talent: ' +
          talentName +
          '<br>' +
          'Profile Link: ' +
          'https://talent.projectcode.me/talent/' +
          talentId +
          '<br><br>' +
          'Hire Type: ' +
          hireType +
          '<br>' +
          'When Needed: ' +
          whenNeeded +
          '<br><br>' +
          'Stack: ' +
          stack +
          '<br>' +
          'Frontend Skills: ' +
          frontendSkills +
          '<br>' +
          'Backend Skills: ' +
          backendSkills +
          '<br>' +
          'Industries: ' +
          industries,

        button: {
          color: '#22BC66',
          text: 'Contact HR',
          link: 'mailto:' + hrEmail,
        },
      },
      // outro: 'If you have any questions, feel free to reply to this email.',
    },
  };

  const hrEmailBody = mailGenerator.generate({
    body: {
      name: 'Hello, ' + hrName,
      intro: 'Request Received Successfully',
      outro:
        'We have successfully received your request for talent acquisition. Our team will review the details and contact you soon with further information. Thank you for choosing Project Code Talent.',
    },
  });

  const emailBody = mailGenerator.generate(response);

  const messageToProjectCode = {
    from: ENV.EMAIL,
    to: 'hello@projectcode.me',
    subject: 'Request for Talent Acquisition',
    html: emailBody,
  };

  const messageToHR = {
    from: ENV.EMAIL,
    to: hrEmail,
    subject: 'Request Received - Project Code Talent',
    html: hrEmailBody,
  };

  try {
    await transporter.sendMail(messageToProjectCode);
    await transporter.sendMail(messageToHR);
    return res.status(200).send({ msg: 'New Talent Requisation' });
  } catch (error) {
    return res.status(500).send({ error });
  }
};
