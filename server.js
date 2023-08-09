import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import { config } from "dotenv"
import { connectDB } from "./config/db.js"
import userRoutes from "./routes/user.js"
import taskRoutes from "./routes/task.js"
const app = express();

config({
    path: "./config/config.env"
});

// Connection Database
connectDB();

// Middlewares
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

// Using Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/task", taskRoutes);

// Server listening
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});