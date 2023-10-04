import { NextResponse } from "next/server";

var exemplo = [
  { prod: "Peixe", preco: 20.99, quant: 10 },
  { prod: "Carne de boi", preco: 20.99, quant: 10 },
  { prod: "Maça", preco: 20.99, quant: 10 },
];

export async function GET(request) {
  return NextResponse.json({ exemplo }, { status: 500 });
}
