import screenModel from "../models/screenModel.js"
import theaterModel from "../models/theaterModel.js"
async function addScreen(req, res) {
    const screenData = req.body
    try {
        const newScreen = new screenModel(screenData)
        const dbres = await newScreen.save()
        if (dbres) {
            const theaterId = screenData.theaterId
            await theaterModel.findByIdAndUpdate(
                theaterId,
                { $push: { screens: dbres._id } },
                { new: true }
            );
            res.status(200).json({ msg: "Screen added successfully" })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error while adding screen", err })
    }
}

async function updateScreen(req, res) {
    const screenId = req.params.id;
    const screenData = req.body;

    try {
        const updatedScreen = await screenModel.findByIdAndUpdate(
            screenId,
            screenData,
            { new: true }
        );

        if (updatedScreen) {
            res.status(200).json({ msg: "Screen updated successfully", updatedScreen });
        } else {
            res.status(404).json({ msg: "Screen not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error while updating screen", err });
    }
}

async function getAllScreens(req, res) {
    try {
        const screens = await screenModel.find();
        res.status(200).json(screens);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error while fetching screens", err });
    }
}

async function deleteScreen(req, res) {
    const screenId = req.params.id;

    try {
        const screen = await screenModel.findById(screenId);

        if (!screen) {
            return res.status(404).json({ msg: "Screen not found" });
        }

        const theaterId = screen.theaterId;

        await screenModel.findByIdAndDelete(screenId);

        await theaterModel.findByIdAndUpdate(
            theaterId,
            { $pull: { screens: screenId } },
            { new: true }
        );

        res.status(200).json({ msg: "Screen deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error while deleting screen", err });
    }
}

async function deleteCategory(req, res) {
    const { scrid, catid } = req.params;
    try {

        const screenRes = await screenModel.findById(scrid);

        console.log(screenRes);



        let categoryField;

        if (screenRes.category1 && screenRes.category1.id == catid) {
            categoryField = "category1"
        } else if (screenRes.category2 && screenRes.category2.id == catid) {
            categoryField = "category2"
        } else if (screenRes.category3 && screenRes.category3.id == catid) {
            categoryField = "category3"
        }

        const updateResult = await screenModel.updateOne(
            { _id: scrid },
            { $unset: { [categoryField]: "" } }
        );
        if (updateResult.modifiedCount == 0) {
            res.status(300).json({ msg: "Category not deleted" })
        } else {
            res.status(200).json({ msg: "Category deleted successfully" })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error while deleting category", err });
    }
}

export { addScreen, updateScreen, deleteScreen, getAllScreens, deleteCategory }