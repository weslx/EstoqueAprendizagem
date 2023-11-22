import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const { name, barcode, shelf, section, quantity_item } = req.body;

  try {
    // Verificar se os valores não são nulos
    if (!name || !barcode || !shelf || !section || !quantity_item) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    const existingProduct = await prisma.products.findFirst({
      where: {
        products_name: {
          barcode: parseInt(barcode),
        },
      },
    });

    if (existingProduct) {
      return res
        .status(400)
        .json({ error: "Produto com este código de barras já existe" });
    }

    // Criar o produto em uma transação
    const createdProduct = await prisma.$transaction(async (tx) => {
      const product = await tx.products.create({
        data: {
          quantity_item,
          products_name: {
            create: { name, barcode: parseInt(barcode) },
          },
          shelfs_sections: {
            create: { shelf, section: parseInt(section) },
          },
        },
      });
      return product;
    });

    res.json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocorreu um erro ao criar o produto" });
  } finally {
    await prisma.$disconnect();
  }
}
