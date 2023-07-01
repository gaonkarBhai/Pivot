// Started At >> 21.5.2023 -> 1:53 PM

// importing the required files
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import cors from "cors";

dotenv.config(); // configure .env

const app = express(); // Rest Object

connectDB(); // database configure

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);

app.get("/", (req, res) => {
  res.json({ message: "Happy Coding" });
});

const PORT = process.env.PORT || 8000; // PORT Variable
app.listen(PORT, () =>
  console.log(` >> Server Started at ${PORT} `.bgMagenta.black)
);
