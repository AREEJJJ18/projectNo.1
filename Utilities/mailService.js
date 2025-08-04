const nodemailer = require('nodemailer');
const mailjetTransport = require('nodemailer-mailjet-transport');

 const transporter =
  process.env.MAIL_PROVIDER === 'mailjet'
    ? nodemailer.createTransport(mailjetTransport({
        auth: { apiKey: process.env.MAIL_USER, apiSecret: process.env.MAIL_PASS }
      }))
    : nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS }
      });

async function sendMail ({to, subject, text, html})
{  
    try
    {  console.log("Before sendMail");
      const info = await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject,
        text,
        html
      })
      console.log("After sendMail");
         return info;
    }
    catch(error)
    {
        throw error
    }
}



module.exports = sendMail