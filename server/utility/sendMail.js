import nodemailer from "nodemailer"

const mailSender = async (email, title, body) => {
    try {
        // Create a Transporter to send emails
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: "orrin2op@gmail.com",
                pass: "lqfxfxnwnfovjpzx",
            }
        });
        // Send emails to users
        let info = await transporter.sendMail({
            from: 'orrin2op@gmail.com',
            to: email,
            subject: title,
            html: body,
        });
        return info;
    } catch (error) {
        console.log(error.message);
    }
};
export default mailSender;