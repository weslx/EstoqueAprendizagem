import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Update a record in the 'products' table
  const updatedProduct = await prisma.products.update({
    where: { id: 2 },
    data: { quantity_box: 10 },
  })
  console.log(updatedProduct)

  // Remove a record from the 'remove' table
  const removedRecord = await prisma.products.delete({
    where: { id: 3 },
  })
  console.log(removedRecord)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })