import express from "express";
import cors from "cors"
import router from "./routes/getMovies.js";
import mongoose from "mongoose";

const mongoURL = "mongodb+srv://orrin2op:9800@inoxbook.2thzfjd.mongodb.net/inoxbook?retryWrites=true&w=majority&appName=inoxbook"

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: '*',
}));
app.use(express.json())
app.use("/", router);

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

mongoose.connect(mongoURL).then(() => {
    app.listen(PORT, () => {
        console.log("Connected to mongoDB");
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.log(err);
})