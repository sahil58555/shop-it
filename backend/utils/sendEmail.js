import nodemailer from 'nodemailer';

const sendEmail = async (options)=>{
    var transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
        }
      });

      const message = {
        from: `${process.env.SMTP_FROM_EMAIL}-${process.env.SMTP_FROM_NAME}`,
        to: options.email,
        subject: options.subject,
        html: options.message,
      }

      await transport.sendMail(message);

}

export default sendEmail;
