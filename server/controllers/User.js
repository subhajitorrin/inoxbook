import userModel from "../models/userModel.js";
import ticketModel from "../models/ticketModel.js"

async function createuser(req, res) {
    const { email, name } = req.body;
    console.log(email, name);
    try {
        const newUser = new userModel({
            email, name
        })
        const dbres = await newUser.save()
        res.status(200).json({ email: dbres.email, name: dbres.name, tickets: dbres.ticket, userId: dbres._id })
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
}

async function getUser(req, res) {
    const { userid } = req.body;
    try {
        if (!userid) {
            return res.status(400).json({ msg: "User ID is required" });
        }
        const dbres = await userModel.findById(userid);
        if (dbres) {
            res.status(200).json({ email: dbres.email, name: dbres.name, tickets: dbres.ticket, userId: dbres._id });
        } else {
            res.status(404).json({ msg: "User not found" });
        }
    } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).json({ msg: "Server error" });
    }
}

async function getAllTicketByUserId(req, res) {
    const { id } = req.params
    try {
        const ticketRes = await userModel.findById(id)
        if (ticketRes) {
            res.status(200).json({ msg: "Tickets fetched successfully", tickets: ticketRes.ticket });
        } else {
            res.status(201).json({ msg: "No tickets found", tickets: [] });
        }
    } catch (err) {
        console.error("Error fetching ticket:", err);
        res.status(500).json({ msg: "Server error" });
    }
}

export { createuser, getUser, getAllTicketByUserId }