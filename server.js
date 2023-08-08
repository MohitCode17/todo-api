import express from "express"
import cookieParser from "cookie-parser"
import { config } from "dotenv"
import { connectDB } from "./config/db.js"
import userRoutes from "./routes/user.js";
const app = express();

config({
    path: "./config/config.env"
});

// Connection Database
connectDB();

// Middlewares
app.use(cookieParser());
app.use(express.json());

// Using Routes
app.use("/api/v1/user", userRoutes);

// Server listening
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});