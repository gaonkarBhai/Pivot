// Started At >> 21.5.2023 -> 1:53 PM

// importing the required files
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";

dotenv.config(); // configure .env

const app = express(); // Rest Object

connectDB(); // database configure

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", authRoute);

app.get("/", (req, res) => {
  res.json({ message: "Happy Coding" });
});

const PORT = process.env.PORT || 8000; // PORT Variable
app.listen(PORT, () =>
  console.log(` >> Server Started at ${PORT} `.bgMagenta.black)
);
