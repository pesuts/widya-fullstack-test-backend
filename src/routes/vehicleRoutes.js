"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehicleController_1 = require("../controllers/vehicleController");
const router = (0, express_1.Router)();
router.get("/:id", vehicleController_1.getVehicleById);
router.get("/", vehicleController_1.getVehicles);
exports.default = router;
