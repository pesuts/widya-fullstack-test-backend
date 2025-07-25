import express from "express";
import router from "../src/routes";
const cors = require("cors");

import dotenv from "dotenv";
dotenv.config();

import { createServer } from "http";

const app = express();
const PORT: number = parseInt(process.env.PORT || "8080", 10);

app.use(cors());
app.use(express.json());
app.use(router);

// Wrap with Vercel-compatible handler
const server = createServer(app);

export default function handler(req: any, res: any) {
  return server.emit("request", req, res);
}
// export default app;
// app.listen(PORT, () => {
//   console.log(`Server is running at http://localhost:${PORT}`);
// });
