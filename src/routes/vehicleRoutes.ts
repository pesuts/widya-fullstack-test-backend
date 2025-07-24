import { Router } from "express";
import { PrismaClient } from "@prisma/client";

export default function (prisma: PrismaClient) {
  const router = Router();

  router.get("/:id", async (req, res) => {
    const id = +req.params.id;
    if (isNaN(id)) {
      return res
        .status(400)
        .send({ status: "error", message: "Id not valid, must be a number!" });
    }
    try {
      const vehicle = await prisma.vehicle.findUnique({ where: { id } });
      if (!vehicle) {
        return res.json({
          message: "Kendaraan kosong",
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
  });

  router.get("/", async (req, res) => {
    try {
      const vehicles = await prisma.vehicle.findMany();
      if (!vehicles || vehicles.length === 0) {
        res.json({
          message: "Kendaraan kosong",
        });
      }
      return res.json({ data: vehicles, status: "success" });
    } catch (err: any) {
      return res.json({
        message: err.message,
        status: "error",
      });
    }
  });

  return router;
}
