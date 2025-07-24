import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default function (prisma: PrismaClient) {
  const router = Router();

  router.get("/", async (req, res) => {
    const users = await prisma.user.findMany();
    const newUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 5),
      }))
    );
    res.json(newUsers);
  });

  router.post("/login", async (req, res) => {
    const secretKey = process.env.JWT_SECRET as string || "SECRET_KEY";
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send({
        message: "Email and password required!",
      });
    }
    try {
      const user = await prisma.user.findFirst({
        where: { email },
      });
      if (!user) {
        return res.json({
          message: "User not found",
        });
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res
          .status(401)
          .send({ status: "error", message: "Wrong password!" });
      }
      console.log(secretKey);

      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        secretKey,
        { expiresIn: "30m" }
      );
      console.log("towt");
      return res.status(200).send({status: "success", message: "Login success", token});
    } catch (err: any) {
      return res.json({
        message: err.message,
        status: "error",
      });
    }
  });

  router.post("/", async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const user = await prisma.user.create({
        data: { name, email, password },
      });
      res.json(user);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}
