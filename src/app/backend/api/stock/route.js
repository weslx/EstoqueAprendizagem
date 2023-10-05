import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addUser(email, name) {
  const user = await prisma.user.create({
    data: {
      email: email,
      name: name,
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
