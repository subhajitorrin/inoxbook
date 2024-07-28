import seatMatrixModel from "../models/seatMatrixModel.js";


async function clearAllSeats() {
    try {
        await seatMatrixModel.updateMany(
            {},
            { $set: { 'seats.$[]': true } }
        );
        console.log('All seats updated to true');
    } catch (error) {
        console.error('Error updating seats:', error);
    }
}
clearAllSeats()