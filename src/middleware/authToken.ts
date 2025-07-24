import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authToken(req: Request, res: Response, next: NextFunction) {
  const secretKey = process.env.JWT_SECRET as string || "SECRET_KEY";
  const header = req.headers;
  const token = header.authorization?.split(" ")[1];
  if (token == null) {
    return res.status(403).send({ status: "error", message: "User not authenticated!" });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    (req as any).user = decoded;
    next();
  } catch (err: any) {
    console.error(err?.message);
    return res.status(403).send({status: "error", message: err.message})
  }
}
