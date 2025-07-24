import { Router } from "express";
import { getVehicleById, getVehicles } from "../controllers/vehicleController";

export default function () {
  const router = Router();
  router.get("/:id", getVehicleById);
  router.get("/", getVehicles);

  return router;
}
