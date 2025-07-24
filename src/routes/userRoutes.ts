import { Router } from "express";
import { getUsers, loginUser } from "../controllers/userController";

const router = Router();
router.get("/", getUsers);
router.post("/login", loginUser);

export default router;
