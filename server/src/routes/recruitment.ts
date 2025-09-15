import { Router } from "express";
import type { PrismaClient, Status } from "@prisma/client";
import jwt from "jsonwebtoken";

function requireAuth(req: any, res: any, next: any) {
  const header = req.headers.authorization as string | undefined;
  if (!header?.startsWith("Bearer ")) return res.status(401).json({ error: "Unauthorized" });
  try {
    const token = header.slice(7);
    const payload = jwt.verify(token, process.env.JWT_SECRET || "dev-secret") as any;
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

export default function recruitmentRouter(prisma: PrismaClient) {
  const router = Router();

  router.get("/", async (_req, res) => {
    const list = await prisma.recruitment.findMany({ orderBy: { createdAt: "desc" } });
    res.json(list);
  });

  router.post("/", requireAuth, async (req: any, res) => {
    try {
      const { title, deadline, posts, questions, whatsappLink, organizationId } = req.body as {
        title: string; deadline: string; posts: string[]; questions?: any; whatsappLink?: string; organizationId: number;
      };
      if (!title || !deadline || !Array.isArray(posts) || !organizationId) return res.status(400).json({ error: "Missing fields" });
      const rec = await prisma.recruitment.create({
        data: {
          title,
          deadline: new Date(deadline),
          posts: posts as any,
          questions: questions ?? null,
          whatsappLink: whatsappLink || null,
          organizationId,
          status: "ACTIVE",
        },
      });
      res.json(rec);
    } catch (e) {
      res.status(500).json({ error: "Failed to create" });
    }
  });

  router.post("/:id/status", requireAuth, async (req, res) => {
    const id = Number(req.params.id);
    const { status } = req.body as { status: Status };
    if (!id || !status) return res.status(400).json({ error: "Missing fields" });
    const updated = await prisma.recruitment.update({ where: { id }, data: { status } });
    res.json(updated);
  });

  return router;
}


