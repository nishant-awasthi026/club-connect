import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { PrismaClient } from "@prisma/client";
import authRouter from "./routes/auth.js";
import recruitmentRouter from "./routes/recruitment.js";
import applicationRouter from "./routes/application.js";

const prisma = new PrismaClient();
const app = express();

app.use(helmet());
app.use(express.json({ limit: "1mb" }));
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || "*" }));
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api/auth", authRouter(prisma));
app.use("/api/recruitments", recruitmentRouter(prisma));
app.use("/api/applications", applicationRouter(prisma));

const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});


