import mongoose from "mongoose";

const castSchema = new mongoose.Schema({
    name: String,
    imageUrl: String
}, { _id: false });

// const reviewSchema = new mongoose.Schema({
//     reviewer: String,
//     rating: Number,
//     comment: String,
//     type: String
// }, { _id: false })

// const showTimeSchema = new mongoose.Schema({
//     showid: String,
//     time: String,
//     type: String
// }, { _id: false })

// const theaterSchema = new mongoose.Schema({
//     theaterId: String,
//     type: String,
//     timings: [showTimeSchema]
// }, { _id: false })

// const timingsSchema = new mongoose.Schema({
//     date: String,
//     type: String,
//     theaters: [theaterSchema]
// }, { _id: false })

const movieSchema = new mongoose.Schema({
    title: String,
    genre: [String],
    duration: Number,
    language: [String],
    CBFCratnig: String,
    releaseDate: String,
    cast: [castSchema],
    synopsis: String,
    rating: String,
    posterUrl: String,
    trailerUrl: String,
    categories: String
});

const movieModel = mongoose.model('currentmovies', movieSchema);

export default movieModel