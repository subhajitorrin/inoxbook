import mongoose from 'mongoose';

const screenSchema = new mongoose.Schema({
    tempid: { type: String },
    name: { type: String },
    theaterId: { type: mongoose.Schema.Types.ObjectId, ref: 'theaters', required: true },
    category1: {
        id: { type: String },
        name: { type: String },
        seats: { type: Number },
        price: { type: Number }
    },
    category2: {
        id: { type: String },
        name: { type: String },
        seats: { type: Number },
        price: { type: Number }
    },
    category3: {
        id: { type: String },
        name: { type: String },
        seats: { type: Number },
        price: { type: Number }
    }
});

export default mongoose.model('screens', screenSchema);
