import express from "express";
import router from "./routes";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(router);

app.get("/api/hello", (req, res) => {
  res.json({
    message: "Hello from Widya Backend",
  });
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
