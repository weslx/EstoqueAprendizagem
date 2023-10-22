import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const { id } = req.query; // ID do produto

  try {
    // Encontre o produto que você deseja obter
    const product = await prisma.products.findUnique({
      where: { id: Number(id) },
      include: {
        products_name: true,
        shelfs_sections: true,
      },
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Ocorreu um erro ao recuperar o produto" });
  } finally {
    await prisma.$disconnect();
  }
}
