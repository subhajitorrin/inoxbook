import express from "express"
import { addScreen, deleteScreen, getAllScreens, updateScreen, deleteCategory,getScreenDetail } from "../controllers/Screen.js";
const ScreenRoutes = express.Router();

ScreenRoutes.post("/addscreen", addScreen)
ScreenRoutes.get("/getallscreens/:theaterid", getAllScreens)
ScreenRoutes.get("/getscreenbyid/:id",getScreenDetail)
ScreenRoutes.put("/updatescreen/:id", updateScreen)
ScreenRoutes.delete("/deletecategory/:scrid/:catid", deleteCategory)
ScreenRoutes.delete("/deletescreen/:id", deleteScreen)
export default ScreenRoutes