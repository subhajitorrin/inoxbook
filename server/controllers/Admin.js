import adminModel from "../models/adminModel.js";

async function authAdmin(req, res) {
    const { username, password } = req.body;
    try {
        const admin = await adminModel.findOne({ username });
        if (!admin) {
            return res.status(400).json({ message: 'Authentication failed: Admin not found' });
        }

        if (admin.password !== password) {
            return res.status(401).json({ message: 'Authentication failed: Incorrect password' });
        }

        return res.status(200).json({ message: 'Authentication successful', adminid: admin._id, theaterId: admin.theaterId });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error });
    }
}

export default authAdmin