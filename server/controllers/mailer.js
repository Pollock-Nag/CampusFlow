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
    hrName,
    hrEmail,
    hrSearchQuery,
    selectedTalentName,
    selectedTalentID,
  } = req.body;

  const response = {
    body: {
      name: 'Project Code',
      intro: 'Request for Talent Acquisition',
      action: {
        instructions:
          'This HR has requested for your talent. Please contact them at the email below.',
        table: {
          data: [
            {
              'HR Name': hrName,
              'HR Email': hrEmail,
              'HR Search Query': hrSearchQuery,
              'Selected Talent': `<a href="${ENV.SITE_URL}/hr/candidate/${selectedTalentID}">${selectedTalentName}</a>`,
            },
          ],
          columns: {
            // Define the column headers
            customColumnNames: {
              'HR Name': 'HR Name',
              'HR Email': 'HR Email',
              'HR Search Query': 'HR Search Query',
              'Selected Talent': 'Selected Talent',
            },
            // Define the column widths (optional)
            customColumnWidths: {
              'HR Name': '20%',
              'HR Email': '20%',
              'HR Search Query': '30%',
              'Selected Talent': '30%',
            },
          },
        },
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

  const messageToCandidate = {
    from: ENV.EMAIL,
    to: 'zahidtwt@gmail.com',
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
    await transporter.sendMail(messageToCandidate);
    await transporter.sendMail(messageToHR);
    return res.status(200).send({ msg: 'New Talent Requisation' });
  } catch (error) {
    return res.status(500).send({ error });
  }
};
