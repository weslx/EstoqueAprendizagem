import { PrismaClient } from "@prisma/client";
import { getAuth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const { name, nome } = req.body; // name = Nome do produto.  // nome = nome do usuario
  const { userId } = getAuth(req);
  console.log(name);

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
    return res.status(400).json({
      error: "Seu usuario foi criado com sucesso, tente adicionar novamente.",
    });
  }

  if (user.allowance === 1) {
    try {
      const product = await prisma.products_name.findMany({
        where: {
          name: {
            contains: name,
            mode: "insensitive",
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
      console.log(product);
    } catch (error) {
      res.status(500).json({ error: "Nao foi possivel encontrar o produto" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(400).json({ error: "Acesso negado  " });
  }
}
