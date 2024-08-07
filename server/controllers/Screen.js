import screenModel from "../models/screenModel.js"
import theaterModel from "../models/theaterModel.js"
import { v4 as uuidv4 } from 'uuid';
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

const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
}

const initializeSeatMatrix = async (screen) => {
    console.log(screen);
    const categoryList = [screen.category1, screen.category2, screen.category3].filter(item => item && item.seats && item.price && item.name);
    let seatmatrix = []
    let alpha = 'A'
    let prevAlpha = ''

    categoryList.forEach((item, index) => {
        let seatrows = []
        for (let i = 0; i < item.seats; i++) {
            if (i % item.rowBreak === 0) {
                seatrows.push({ row: alpha, columns: [] })
                prevAlpha = alpha
                alpha = String.fromCharCode(alpha.charCodeAt(0) + 1);
            }
            seatrows[seatrows.length - 1].columns.push({
                column: (i % item.rowBreak) + 1,
                category: item.name,
                price: item.price,
                isBooked: false,
                seatCode: `${prevAlpha}${(i % item.rowBreak) + 1}`
            })
        }
        let obj = {
            category: item.name,
            price: item.price,
            seatrows
        }
        seatmatrix.push(obj)
    })
    screen.seatmatrix = seatmatrix
    const finalScreen = await screenModel.findByIdAndUpdate(screen._id, screen, { new: true })
    return finalScreen
};


async function updateScreen(req, res) {
    const screenId = req.params.id;
    const screenData = req.body;

    try {
        const updatedScreenRes = await screenModel.findByIdAndUpdate(
            screenId,
            screenData,
            { new: true }
        );

        if (updatedScreenRes) {
            const finalScreen = await initializeSeatMatrix(updatedScreenRes)
            res.status(200).json({ msg: "Screen updated successfully", finalScreen });
        } else {
            res.status(404).json({ msg: "Screen not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error while updating screen", err });
    }
}

async function getAllScreens(req, res) {
    const { theaterid } = req.params
    try {
        const screens = await screenModel.find({ theaterId: theaterid });
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

        // console.log(screenRes);



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
            res.status(300).json({ msg: "Category not deleted" })
        } else {
            res.status(200).json({ msg: "Category deleted successfully" })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error while deleting category", err });
    }
}

async function getScreenDetail(req, res) {
    const { id } = req.params;
    try {
        const dbres = await screenModel.findById(id);
        if (dbres) {
            res.status(200).json({ msg: "Screen data fetch successful", screen: dbres });
        } else {
            res.status(404).json({ msg: "Screen not found" });
        }
    } catch (err) {
        console.error('Error while fetching screen detail:', err);
        res.status(500).json({ msg: "Error while fetching screen detail", err });
    }
}


export { addScreen, updateScreen, deleteScreen, getAllScreens, deleteCategory, getScreenDetail }