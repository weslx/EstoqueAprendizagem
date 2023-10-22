import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  try {
    const { name, nameId, shelfs_sections_id, section, quantityItem } =
      req.body;

    const product = await prisma.products.create({
      data: {
        quantity_item: Number(quantityItem),
        products_name: {
          connectOrCreate: {
            where: { id: Number(nameId) },
            create: { name: name },
          },
        },
        shelfs_sections: {
          connectOrCreate: {
            where: { id: Number(shelfs_sections_id) },
            create: { section: Number(section) },
          },
        },
      },
    });

    res.json(product);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
