import theaterList from "../data/theaterdata.json" assert { type: "json" };

function getTheaterById(req, res) {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "Theater ID is required" });
    }
    try {
        const theater = theaterList.find((item) => item.id == id);
        if (theater) {
            return res.status(200).json({ theater });
        } else {
            return res.status(404).json({ error: "Theater not found" });
        }
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return res.status(500).json({ error: "An internal server error occurred" });
    }
}

export default getTheaterById