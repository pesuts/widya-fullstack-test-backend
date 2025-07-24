import { Router } from "express";
import { getUserById, loginUser } from "../controllers/userController";

export default function () {
  const router = Router();
  router.get("/", getUserById);
  router.post("/login", loginUser);

  return router;
}
