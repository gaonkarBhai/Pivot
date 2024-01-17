import sgMail from "@sendgrid/mail";

export const sendMail = async (to, subject, html) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    try {
        const msg = {
          to:to, // Change to your recipient
          from: process.env.SENDGRID_AUTH_EMAIL, // Change to your verified sender
          subject,
          html,
        };
         await sgMail.send(msg);
    } catch (error) {
        console.log(error);
    }
}