import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        default: "Guest"
    },
    ticket: {
        type: [String],
        default: []
    }
});

const userModel = mongoose.model('users', userSchema);

export default userModel;
