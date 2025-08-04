const sendMail = require('../Utilities/mailService');
const errorResponse = require('../Utilities/errorResponseHandling');
const sendWelcomeEmail = async (req, res) => {
  try {
    const { to, subject, text, html } = req.body; 
    const info = await sendMail({
      to,
      subject,
      text,
      html
    });
        return res.status(200).json({ message: "Email sent successfully", info });
  } 
  catch(error) 
  {
        return errorResponse(res, 500, 'An unexpected error occurred while sending email');
  }
};
module.exports = sendWelcomeEmail