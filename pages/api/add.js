import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(req, res) {
  try {
    const { datetime, name, nameId,shelf,section, quantityBox, quantityItem } = req.body

    const box = await prisma.box.create({
      data: {
        datetime: new Date(datetime), // certifique-se de que datetime é uma string ISO 8601
      },
    })

    const product = await prisma.product.create({
      data: {
        productsName: {
          connectOrCreate: {
            where: { id: Number(nameId) },
            create: { name: name },
          },
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
        shelf: shelf,
        section: Number(section),
      },
    })

    const result = await prisma.$transaction([
      prisma.stock.create({
        data: {
          boxId: box.id,
          productsId: product.id,
          shelfsSectionsId: shelfsSections.id,
        },
      }),
      prisma.remove.create({
        data: {
          productsId: product.id,
          boxId: box.id,
          shelfsSectionsId: shelfsSections.id,
          quantityBox: Number(quantityBox),
          datetime: new Date(datetime),
        },
      }),
    ])

    res.json(result)
  } catch (error) {
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}
