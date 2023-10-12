import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const { id } = req.query; // ID do produto

  try {
    // Primeiro, encontre o produto que você deseja excluir
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        box: true,
        productsName: true,
        stock: {
          include: {
            shelfsSections: true,
          },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    // Em seguida, exclua todas as informações relacionadas ao produto
    await prisma.stock.deleteMany({
      where: { productsId: Number(id) },
    });

    await prisma.remove.deleteMany({
      where: { productsId: Number(id) },
    });

    // Agora, exclua o produto do banco de dados
    const deletedProduct = await prisma.product.delete({
      where: { id: Number(id) },
    });

    // Exclua também as informações relacionadas em Box e ProductsName
    await prisma.box.delete({
      where: { id: product.box.id },
    });

    await prisma.productsName.delete({
      where: { id: product.productsName.id },
    });

    // Exclua todas as ShelfsSections relacionadas ao produto
    for (let stock of product.stock) {
      await prisma.shelfsSections.delete({
        where: { id: stock.shelfsSections.id },
      });
    }

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
