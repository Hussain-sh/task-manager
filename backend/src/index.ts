import "dotenv/config"
import cors from "cors";
import express from "express";
import errorHandler from "./middlewares/errorHandler";
import taskRoutes from "./routes/task.routes";
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}))

app.get("/", (req, res) => {
    res.json({ message: "Server is running"})
});

app.use("/api/tasks", taskRoutes);

app.use(errorHandler);

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})
