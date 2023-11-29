import { PrismaClient } from "@prisma/client";
import { getAuth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const { name, barcode, shelf, section, quantity_item, nome } = req.body;
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(400).json({ error: "Usuario nao encontrado" });
  } else {
    var user = await prisma.users.findFirst({
      where: {
        userId: userId,
      },
    });
  }
  if (!user) {
    const useradc = await prisma.users.create({
      data: {
        userId: userId,
        username: nome,
      },
    });
  }
  if (user.allowance === 1) {
    try {
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
            users: {
              connect: { userId: userId },
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
  } else {
    return res.status(400).json({ error: "Acesso negado" });
  }
}
