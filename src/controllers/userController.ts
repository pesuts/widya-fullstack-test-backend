import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    res.status(200).send({ status: "success", data: users });
  } catch (err: any) {
    return res.json({
      message: err.message,
      status: "error",
    });
  }
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
      return res.status(404).send({
        status: "error",
        message: "User not found",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .send({ status: "error", message: "Wrong password!" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      secretKey,
      { expiresIn: "30m" }
    );

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
