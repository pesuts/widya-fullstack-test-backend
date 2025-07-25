import express from "express";
import router from "../src/routes";
const cors = require("cors");

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT: number = parseInt(process.env.PORT || "8080", 10);

app.use(cors());
app.use(express.json());
app.use(router);

export default app;