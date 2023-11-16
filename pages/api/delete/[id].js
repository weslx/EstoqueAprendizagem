import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const { id } = req.query; // ID do produto

  try {
    if (isNaN(id)) {
      res
        .status(400)
        .json({ error: "ID do produto obrigatoriamente precisa ser numero" });
    }
    const product = await prisma.products.findUnique({
      where: { id: Number(id) },
      include: {
        products_name: true,
        shelfs_sections: true,
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    // Em seguida, exclua todas as informações relacionadas ao produto

    // Agora, exclua o produto do banco de dados
    const deletedProduct = await prisma.products.delete({
      where: { id: Number(id) },
    });

    // Exclua também as informações relacionadas em Box e ProductsName

    await prisma.products_name.delete({
      where: { id: product.products_name_id },
    });

    await prisma.shelfs_sections.delete({
      where: {
        id: product.shelfs_sections_id,
      },
    });

    // Retorne o produto excluído como resposta
    res.json(deletedProduct);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Ocorreu um erro ao tentar excluir o produto" });
  } finally {
    await prisma.$disconnect();
  }
}
