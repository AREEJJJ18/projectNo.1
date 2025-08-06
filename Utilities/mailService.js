const nodemailer = require('nodemailer');
const mailjetTransport = require('nodemailer-mailjet-transport');
require('dotenv').config();

 const transporter = nodemailer.createTransport(
  mailjetTransport
       ({
        auth: 
              { 
                 apiKey: process.env.MJ_API_KEY,
                 apiSecret: process.env.MJ_SECRET_KEY
               },
               pool: true,
               maxConnections: 1,
               rateLimit: 1
        }))
  

async function sendMail ({to, subject, text, html})
{  
    try
    {  
        const info = await Promise.race([
        transporter.sendMail({
        from: process.env.SENDER,
        to,
        subject,
        text: text || "",
        html: html || `<p>${text}</p>`
      }),
        new Promise((resolve) => 
        setTimeout(() => resolve({ message: "Mailjet request sent, no immediate response" }), 8000)
      )
    ]);
         return info;
    }
    catch(error)
    {
        throw error
    }
}

module.exports = sendMail