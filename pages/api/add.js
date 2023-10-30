import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  try {
    let { name, barcode, shelf, section, quantity_item } = req.body;

    // Convertendo 'barcode' para um número inteiro
    barcode = parseInt(barcode);
    quantity_item = parseInt(quantity_item);
    section = parseInt(section);
    const product = await prisma.products.create({
      data: {
        quantity_item,
        products_name: {
          create: { name, barcode },
        },
        shelfs_sections: {
          create: { shelf, section },
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
