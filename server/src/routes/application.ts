import { Router } from "express";
import type { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

function tryAuth(req: any) {
  const header = req.headers.authorization as string | undefined;
  if (!header?.startsWith("Bearer ")) return null;
  try {
    const token = header.slice(7);
    const payload = jwt.verify(token, process.env.JWT_SECRET || "dev-secret") as any;
    return { id: payload.sub, role: payload.role };
  } catch {
    return null;
  }
}

export default function applicationRouter(prisma: PrismaClient) {
  const router = Router();

  router.post("/apply", async (req, res) => {
    const user = tryAuth(req);
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    const { recruitmentId, selectedPost, answers } = req.body as { recruitmentId: number; selectedPost: string; answers: any };
    if (!recruitmentId || !selectedPost) return res.status(400).json({ error: "Missing fields" });
    const app = await prisma.application.create({
      data: {
        applicantId: Number(user.id),
        recruitmentId: Number(recruitmentId),
        selectedPost,
        answers: (answers || {}) as any,
      },
      include: { recruitment: true, applicant: true },
    });
    res.json(app);
  });

  router.get("/recruitment/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "Invalid id" });
    const apps = await prisma.application.findMany({
      where: { recruitmentId: id },
      include: { applicant: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(apps.map(a => ({
      id: a.id,
      name: a.applicant.name,
      email: a.applicant.email,
      registration: a.applicant.id.toString(),
      selectedPost: a.selectedPost,
      answers: a.answers,
      createdAt: a.createdAt,
    })));
  });

  return router;
}


