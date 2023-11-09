import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const { name } = req.body; // ID do produto

  try {
    // Encontre o produto que você deseja obter
    const product = await prisma.products_name.findMany({
      where: {
        name: name,
      },
      include: {
        product: {
          include: {
            shelfs_sections: true,
          },
        },
      },
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error });
  } finally {
    await prisma.$disconnect();
  }
}
