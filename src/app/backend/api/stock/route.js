import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

// var inputt = document.getElementById("").value;
// receber valor do input e fazer a request ao banco de dados

// receber dados e mostrar na tela

export async function GET(request) {
  const prisma = new PrismaClient();

  const user = await prisma.user.create({
    data: {
      email: "alicse@example.com",
      name: "Alice",
    },
  });
  const lista = prisma.user.findMany();
  console.log(lista);

  return console.log(user);
}
