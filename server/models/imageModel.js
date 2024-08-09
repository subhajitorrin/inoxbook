import mongoose from "mongoose"

const imageSchema = mongoose.Schema({
    image: String
})

const imageModel = mongoose.Model("images", imageSchema)
export default imageModel