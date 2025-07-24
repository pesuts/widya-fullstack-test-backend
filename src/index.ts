import express from "express";
import { PrismaClient } from "@prisma/client";
// import { PrismaClient } from "../generated/prisma/client.js";

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({
    message: 'Hello from Widya Backend'
  });
});

app.get('/api/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
});