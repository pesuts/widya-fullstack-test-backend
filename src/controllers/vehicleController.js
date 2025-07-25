"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVehicleById = exports.getVehicles = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const getVehicles = async (req, res) => {
    try {
        const vehicles = await prisma_1.default.vehicle.findMany();
        if (!vehicles || vehicles.length === 0) {
            res.json({
                status: "sucess",
                message: "Vechiles Still Empty",
            });
        }
        return res.json({ data: vehicles, status: "success" });
    }
    catch (err) {
        return res.json({
            message: err.message,
            status: "error",
        });
    }
};
exports.getVehicles = getVehicles;
const getVehicleById = async (req, res) => {
    const id = +req.params.id;
    if (isNaN(id)) {
        return res
            .status(400)
            .send({ status: "error", message: "Id not valid, must be a number!" });
    }
    try {
        const vehicle = await prisma_1.default.vehicle.findUnique({ where: { id } });
        if (!vehicle) {
            return res.status(404).send({
                status: "error",
                message: "Vehicle Not Found!",
            });
        }
        return res.json({
            status: "success",
            data: vehicle,
        });
    }
    catch (err) {
        return res.json({
            message: err.message,
            status: "error",
        });
    }
};
exports.getVehicleById = getVehicleById;
