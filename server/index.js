import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import MovieRoutes from "./routes/MovieRoutes.js";
import TheaterRoutes from "./routes/TheaterRoutes.js";
import SeatMatrixRoutes from "./routes/SeatMatrixRoutes.js";
import BookingRoutes from "./routes/BookingRoutes.js";
import VerifyRoutes from "./routes/VerifyRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";

const mongoURL = "mongodb+srv://orrin2op:9800@inoxbook.2thzfjd.mongodb.net/inoxbook?retryWrites=true&w=majority&appName=inoxbook"
const PORT = 5000;
const app = express();

app.use(cors({
    origin: '*',
}));
app.use(express.json())

app.use("/", MovieRoutes);
app.use("/", TheaterRoutes);
app.use("/", SeatMatrixRoutes);
app.use("/", BookingRoutes);
app.use("/", VerifyRoutes);
app.use("/", UserRoutes);

mongoose.connect(mongoURL).then(() => {
    app.listen(PORT, () => {
        console.log("Connected to mongoDB");
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.log(err);
})