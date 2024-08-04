import theaterModel from "../models/theaterModel.js"
async function addTheater(req, res) {
    const { name, address, location } = req.body
    try {
        const theaterData = new theaterModel({
            name, address, location
        })
        const dbres = await theaterData.save()
        if (dbres) {
            res.status(200).json({ msg: "Theater added successfully" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error while adding theater", error })
    }
}
async function updateTheater(req, res) {
    const { id } = req.params
    const updatedData = req.body
    try {
        const dbres = await theaterModel.findByIdAndUpdate(id, updatedData, { new: true })
        if (dbres) {
            res.status(200).json({
                message: "Theater updated successfully",
                theater: dbres
            })
        } else {
            res.status(400).json({ message: 'Theater not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error while updating theater", error })
    }
}

async function getTheaterById(req, res) {
    const { id } = req.params
    try {
        const theater = await theaterModel.findById(id)
        if (theater) {
            res.status(200).json({
                message: "Theater retrieved successfully",
                theater
            })
        } else {
            res.status(404).json({ message: 'Theater not found' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Error while retrieving theater", error })
    }
}

async function getAllTheaters(req, res) {
    try {
        const dbres = await theaterModel.find({}).exec()
        if (dbres.length > 0) {
            res.status(200).json({
                message: "Theaters retrieved successfully",
                theaters: dbres
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "Error while retrieving all theaters", err })
    }
}


export { addTheater, updateTheater, getTheaterById,getAllTheaters }