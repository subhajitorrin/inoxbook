import otpModel from "../models/otpModel.js";
import mailSender from "../utility/sendMail.js";
import userModel from "../models/userModel.js";

async function sendotp(req, res) {
    try {
        const { email } = req.body
        const otp = generate5DigitOTP()
        await mailSender(email, "Your OTP for INOXBOOK", `Your OTP is: ${otp}`);
        const otpRecord = new otpModel({
            email,
            otp
        });
        const otpresponse = await otpRecord.save();
        res.json({ msg: "OTP sent successfully", email, otpid: otpresponse._id });
    } catch (error) {
        res.json({ error })
    }
}

async function verifyotp(req, res) {
    try {
        const { email, optid, otp } = req.body;

        const otpresponse = await otpModel.findById(optid);

        if (!otpresponse) {
            return res.status(203).json({ msg: "OTP expired, send again" });
        }

        if (otpresponse.otp === otp) {
            const existingUser = await userModel.findOne({ email })
            if (existingUser) {
                return res.status(200).json({ email: existingUser.email, name: existingUser.name, tickets: existingUser.ticket, userId: existingUser._id });
            } else {
                return res.status(201).json({});
            }
        } else {
            return res.status(202).json({ msg: "Wrong OTP" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
}

function generate5DigitOTP() {
    const firstDigit = Math.floor(Math.random() * 9) + 1;
    const restDigits = Math.floor(1000 + Math.random() * 9000);
    return `${firstDigit}${restDigits}`
}

export { sendotp, verifyotp }