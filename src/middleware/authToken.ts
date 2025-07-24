import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authToken(req: Request, res: Response, next: NextFunction) {
  const secretKey = process.env.JWT_SECRET as string || "SECRET_KEY";
  const header = req.headers;
  const token = header.authorization?.split(" ")[1];
  if (token == null) {
    return res.status(403).send({ status: "error", message: "User not authenticated!" });
  }
  jwt.verify(token!, secretKey, (err) => {
    console.log(err?.message);
    console.log(secretKey)
    if (err) { 
      return res.status(403).send({status: "error", message: err.message})
    }
    next();
  })
}
