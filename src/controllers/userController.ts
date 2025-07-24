import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";

export const getUserById = async (req: Request, res: Response) => {

  const users = await prisma.user.findMany();
  const newUsers = await Promise.all(
    users.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, 5),
    }))
  );
  res.json(newUsers);
};

export const loginUser = async (req: Request, res: Response) => {
  const secretKey = (process.env.JWT_SECRET as string) || "SECRET_KEY";
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
    return res
      .status(200)
      .send({ status: "success", message: "Login success", token });
  } catch (err: any) {
    return res.json({
      message: err.message,
      status: "error",
    });
  }
};
