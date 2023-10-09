import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(req, res) {
  const { datetime, productId, nameId, shelf, section, quantityBox, quantityItem } = req.body

  // Adicione validações aqui conforme necessário

  const box = await prisma.box.create({
    data: {
      datetime: new Date(datetime), // certifique-se de que datetime é uma string ISO 8601
    },
  })

  const productsName = await prisma.productsName.create({
    data: {
      name: 'Nome do Produto', // substitua pela variável apropriada
    },
  })

  const product = await prisma.product.create({
    data: {
      productsName: {
        connect: { id: productsName.id },
      },
      box: {
        connect: { id: box.id },
      },
      quantityBox: Number(quantityBox),
      quantityItem: Number(quantityItem),
    },
  })

  const shelfsSections = await prisma.shelfsSections.create({
    data: {
      shelf: 'Nome da Prateleira', // substitua pela variável apropriada
      section: Number(section),
    },
  })

  const stock = await prisma.stock.create({
    data: {
      boxId: box.id,
      productsId: product.id,
      shelfsSectionsId: shelfsSections.id,
    },
  })

  const remove = await prisma.remove.create({
    data: {
      productsId: product.id,
      boxId: box.id,
      shelfsSectionsId: shelfsSections.id,
      quantityBox: Number(quantityBox),
      datetime: new Date(datetime),
    },
  })

  res.json({ box, productsName, product, shelfsSections, stock, remove })
}
