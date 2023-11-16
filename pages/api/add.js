import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  try {
    let { name, barcode, shelf, section, quantity_item } = req.body;

    // Verificar se os valores não são nulos
    if (!name || !barcode || !shelf || !section || !quantity_item) {
      res.status(400).json({ error: "Todos os campos são obrigatórios" });
      return;
    }

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
    res.status(500).json({ error: "Ocorreu um erro ao criar o produto" });
  } finally {
    await prisma.$disconnect();
  }
}
