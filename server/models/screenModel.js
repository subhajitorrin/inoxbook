import mongoose from 'mongoose';
import { seatSchema } from './seatModel.js';
const screenSchema = new mongoose.Schema({
    tempid: { type: String },
    name: { type: String },
    seatmatrix: [{
        category: { type: String },
        price: { type: Number },
        seatrows: [{
            row: { type: String },
            columns: { type: [seatSchema], default: [] }
        }]
    }],
    theaterId: { type: mongoose.Schema.Types.ObjectId, ref: 'theaters', required: true },
    category1: {
        id: { type: String },
        name: { type: String },
        seats: { type: Number },
        price: { type: Number },
        rowBreak: { type: Number },
        gaps: { type: String },
    },
    category2: {
        id: { type: String },
        name: { type: String },
        seats: { type: Number },
        price: { type: Number },
        rowBreak: { type: Number },
        gaps: { type: String },
    },
    category3: {
        id: { type: String },
        name: { type: String },
        seats: { type: Number },
        price: { type: Number },
        rowBreak: { type: Number },
        gaps: { type: String },
    }
});

export default mongoose.model('screens', screenSchema);