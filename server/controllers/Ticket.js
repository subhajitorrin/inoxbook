import ticketModel from "../models/ticketModel.js";

async function getTicketById(req, res) {
    const { id } = req.params
    try {
        const ticketRes = await ticketModel.findById(id)
        if (ticketRes) {
            res.status(200).json({ msg: "Ticket fetch successfully", ticket: ticketRes })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Ticket not found" })
    }
}

export default getTicketById