import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const { id } = req.query; // ID do produto

  try {
    // Encontre o produto que você deseja obter
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        box: true,
        productsName: true,
        stock: {
          include: {
            shelfsSections: true,
          },
        },
      },
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Ocorreu um erro ao recuperar o produto" });
  }
}
