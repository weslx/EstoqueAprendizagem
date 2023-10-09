import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(req, res) {
  const { datetime, productId, nameId, shelf, section, quantityBox, quantityItem } = req.body

  // Adicione validações aqui conforme necessário

  const result = await prisma.$transaction([
    prisma.box.create({
      data: {
        datetime: new Date(datetime), // certifique-se de que datetime é uma string ISO 8601
      },
    }),
    prisma.product.create({
      data: {
        productsName: {
          connect: { id: Number(nameId) },
        },
        box: {
          connect: { id: Number(shelf) }, // assumindo que 'shelf' é o 'boxId'
        },
        quantityBox: Number(quantityBox),
        quantityItem: Number(quantityItem),
      },
    }),
    prisma.stock.create({
      data: {
        boxId: Number(shelf), // assumindo que 'shelf' é o 'boxId'
        productsId: Number(productId),
        shelfsSectionsId: Number(section),
      },
    }),
    prisma.shelfsSections.create({
      data: {
        shelf: 'Nome da Prateleira', // substitua pela variável apropriada
        section: Number(section),
      },
    }),
    prisma.remove.create({
      data: {
        productsId: Number(productId),
        boxId: Number(shelf), // assumindo que 'shelf' é o 'boxId'
        shelfsSectionsId: Number(section),
        quantityBox: Number(quantityBox),
        datetime: new Date(datetime),
      },
    }),
  ])

  res.json(result)
}
