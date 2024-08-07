import nodemailer from "nodemailer"

const mailSender = async (email, title, body, attachments) => {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: "orrin2op@gmail.com",
                pass: "lqfxfxnwnfovjpzx",
            }
        });
        let info = await transporter.sendMail({
            from: 'orrin2op@gmail.com',
            to: email,
            subject: title,
            html: body,
            attachments
        });
        return info;
    } catch (error) {
        console.log(error.message);
    }
};
export default mailSender;