import { Router } from "express";
import { getVehicleById, getVehicles } from "../controllers/vehicleController";

const router = Router();
router.get("/:id", getVehicleById);
router.get("/", getVehicles);

export default router;
