// pages/api/shelfs.js
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  try {
    const shelfs = await prisma.shelfs_sections.findMany();
    res.status(200).json(shelfs);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch shelfs" });
  } finally {
    await prisma.$disconnect();
  }
}
