import express from "express";
import router from "../routes";
const cors = require("cors");

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT: number = parseInt(process.env.PORT || "8080", 10);

app.use(cors());
app.use(express.json());
app.use(router);

import { createServer } from 'http';
const server = createServer(app);

export default async function handler(req: any, res: any) {
  server.emit('request', req, res);
}