import express from "express";
import cors from "cors"
import router from "./routes/getMovies.js";

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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
