import * as express from "express";
import userRoutes from "./userRoutes";
import vehicleRoutes from "./vehicleRoutes";
import { PrismaClient } from "@prisma/client";
import { authToken } from "../middleware/authToken";

const prisma = new PrismaClient();
const router = express.Router();

router.use("/users", userRoutes(prisma));
router.use("/vehicles", authToken, vehicleRoutes(prisma));

export default router;