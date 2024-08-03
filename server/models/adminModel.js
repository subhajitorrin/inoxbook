import mongoose from "mongoose";
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    theaterId: {
        type: Schema.Types.ObjectId,
        ref: 'theaters',
    }
})

const adminModel = mongoose.model('admins', adminSchema);

export default adminModel;
