import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addUser(nome, id, shelf, section) {
  const user = await prisma.user.create({
    data: {
      nome: nome,
      id: id,
      shelf: shelf,
      section: section,
    },
  });
  return user;
}

export async function removeUser(email) {
  const user = await prisma.user.delete({
    where: {
      email: email,
    },
  });
  return user;
}
