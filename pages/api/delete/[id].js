import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function deleteProduct(req, res) {
  const { id } = req.query

  const removedRecord = await prisma.products.delete({
    where: { id: Number(id) },
  })

  console.log(removedRecord)

  res.status(200).json({ message: 'Deleted with success' })
}
