import { PrismaClient } from "@prisma/client";
import { getAuth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const { name } = req.body; // ID do produto
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
      const product = await prisma.products_name.findMany({
        where: {
          name: {
            contains: name,
          },
        },
        include: {
          products: {
            include: {
              shelfs_sections: true,
              users: true,
            },
          },
        },
      });

      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Nao foi possivel encontrar o produto" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(400).json({ error: "Acesso negado  " });
  }
}
