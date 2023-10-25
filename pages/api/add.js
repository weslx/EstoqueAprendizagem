import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  try {
    const { name, shelf, section, quantityItem } = req.body;

    const product = await prisma.products.create({
      data: {
        products_name: {
          create: { name: name },
        },
        quantity_item: Number(quantityItem),
        code_bar: {
          create: { code: "aaaaa" },
        },
        shelfs_sections: {
          create: { shelf: "aa", sections: 1 },
        },
      },
    });

    const shelfs_sections = await prisma.shelfs_sections.create({
      data: {
        shelf: shelf,
        sections: Number(section),
      },
    });

    res.json(result);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
