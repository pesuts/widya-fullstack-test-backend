import * as express from "express";
import userRoutes from "./userRoutes";
import vehicleRoutes from "./vehicleRoutes";
import { authToken } from "../middleware/authToken";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/vehicles", authToken, vehicleRoutes);

export default router;