import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await prisma.vehicle.findMany();
    if (!vehicles || vehicles.length === 0) {
      res.json({
        status: "sucess",
        message: "Vechiles Still Empty",
      });
    }
    return res.json({ data: vehicles, status: "success" });
  } catch (err: any) {
    return res.json({
      message: err.message,
      status: "error",
    });
  }
};

export const getVehicleById = async (req: Request, res: Response) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    return res
      .status(400)
      .send({ status: "error", message: "Id not valid, must be a number!" });
  }
  try {
    const vehicle = await prisma.vehicle.findUnique({ where: { id } });
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
  } catch (err: any) {
    return res.json({
      message: err.message,
      status: "error",
    });
  }
};
