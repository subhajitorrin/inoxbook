import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    id: String,
    title: String,
    genre: [String],
    duration: Number,
    language: [String],
    CBFCratnig: String,
    releaseDate: Date,
    director: String,
    cast: [{
        name: String,
        imageUrl: String,
        type: String
    }],
    synopsis: String,
    rating: String,
    posterUrl: String,
    backPoster: String,
    trailerUrl: String,
    reviews: [{
        reviewer: String,
        rating: Number,
        comment: String,
        type: String
    }],
    timings: [{
        date: Date,
        type: String,
        theaters: [{
            theaterId: String,
            type: String,
            timings: [{
                showid: String,
                time: String,
                type: String
            }]
        }]
    }]
});

const movieModel = mongoose.model('currentmovies', movieSchema);

export default movieModel