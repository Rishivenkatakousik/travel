const nodemailer = require('nodemailer');

export async function sendEmailNotification(ip, userAgent, time) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,// Use App Password (not your main password)
        }
    });

    let mailOptions = {
        from: process.env.MAIL_USER,
        to: 'koushikrishi23@gmail.com', // You receive the email
        subject: 'New Website Visit Logged',
        text: `New visitor details:
- IP Address: ${ip}
- User Agent: ${userAgent}
- Time: ${time}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error);
    }
}
