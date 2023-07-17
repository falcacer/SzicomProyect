import bodyParser from "body-parser";
import express from "express";
import { router as questionRoutes } from "./routes/questions.js";
import { router as authRoutes } from "./routes/auth.js";
import cors from "cors";

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(authRoutes);

app.use("/questions", questionRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

app.listen(8080, () => {
  console.log("Listeting port 8080");
});
