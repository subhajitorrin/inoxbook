import seatMatrixModel from "../models/seatMatrixModel.js";
async function getSeatmatrixByShowId(req, res) {
    try {
        const { showid } = req.params;
        const resultedseatmatrix = await seatMatrixModel.findOne({ showid });
        if (resultedseatmatrix) {
            return res.status(200).json({ seatmatrix: resultedseatmatrix.seats })
        } else {
            return res.status(404).json({ error: "seatmatrix not found" });
        }

    } catch (error) {
        console.error("Error fetching seatmatrix details:", error);
        return res.status(500).json({ error: "An internal server error occurred" });
    }
}
export default getSeatmatrixByShowId