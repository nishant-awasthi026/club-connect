import { Router } from "express";
import type { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default function authRouter(prisma: PrismaClient) {
  const router = Router();

  router.post("/signup", async (req, res) => {
    try {
      const { email, password, name, role } = req.body as { email: string; password: string; name: string; role?: "STUDENT" | "ORGANIZER" };
      if (!email || !password || !name) return res.status(400).json({ error: "Missing required fields" });
      const hashed = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({ data: { email, password: hashed, name, role: role === "ORGANIZER" ? "ORGANIZER" : "STUDENT" } });
      const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET || "dev-secret", { expiresIn: "7d" });
      res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    } catch (e: any) {
      if (e.code === "P2002") return res.status(409).json({ error: "Email already in use" });
      res.status(500).json({ error: "Internal error" });
    }
  });

  router.post("/signin", async (req, res) => {
    const { email, password } = req.body as { email: string; password: string };
    if (!email || !password) return res.status(400).json({ error: "Missing required fields" });
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET || "dev-secret", { expiresIn: "7d" });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  });

  return router;
}


