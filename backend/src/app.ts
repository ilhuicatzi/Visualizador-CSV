import express from "express";
import morgan from "morgan";
import cors from "cors";
import { Request, Response, NextFunction } from "express";
import { CORS_ORIGIN } from "./config";
import fileRouter from "./routes/file.router";
import userRouter from "./routes/user.router";

interface CustomError extends Error {
    statusCode?: number;
  }

const app = express();
app.use(
    cors({
      origin: CORS_ORIGIN,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"], // Asegura que "Content-Type" esté permitido.
    })
  );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.json({ message: "Welcome to my API with Nodejs and TypeScript!" });
});

app.use("/api", fileRouter);
app.use("/api", userRouter);

app.use((err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.statusCode || 500).json({
      status: "error",
      message: err.message || "Internal Server Error",
    });
  });


export default app;
