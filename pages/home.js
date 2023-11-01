"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const [name, setname] = useState("");
  const [shelf, setShelfs] = useState([]);
  const [barcode, setbarcode] = useState(0); // Inicializado como um número
  const [section, setSection] = useState("");
  const [quantity_item, setQuantityItem] = useState(0);
  const [removeId, setRemoveId] = useState("");
  console.log("render");

  const handleAddChange = (e) => {
    switch (e.target.name) {
      case "name":
        setname(e.target.value);
        break;
      case "barcode":
        setbarcode(parseInt(e.target.value)); // Convertendo o valor para um número inteiro
        break;
      case "shelf":
        setShelfs(e.target.value);
        break;
      case "section":
        setSection(e.target.value);
        break;
      case "quantity_item":
        setQuantityItem(parseInt(e.target.value));
        break;
    }
  };

  const handleRemoveChange = (e) => {
    switch (e.target.name) {
      case "id":
        setRemoveId(e.target.value);
        break;
      case "local":
        setLocal(e.target.value);
        break;
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    const item = {
      name,
      barcode,
      section,
      shelf,
      quantity_item,
    };

    console.log(item);

    const response = await fetch(
      "https://estoque-aprendizagem.vercel.app//api/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }
    );

    if (!response.ok) {
      console.error("Erro ao adicionar item", response);
    } else {
      const data = await response.json();
      console.log(data);
    }
  };

  async function handleRemoveSubmit(e) {
    e.preventDefault();

    const response = await fetch(
      `https://estoque-aprendizagem.vercel.app//api/delete/${removeId}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    console.log(data);
  }

  return (
    <div class="content">
      <div class="add">
        <h2 class="">Adicionar Item</h2>
        <form onSubmit={handleAddSubmit} class="addcontent">
          <input
            class="inpt1"
            type="text"
            placeholder="Nome"
            name="name"
            onChange={handleAddChange}
          />
          <input
            class="inpt1"
            type="text"
            name="barcode"
            placeholder="Codigo de barras"
            onChange={handleAddChange}
          />
          <input
            class="inpt1
"
            type="text"
            name="shelf"
            placeholder="Prateleira"
            onChange={handleAddChange}
          />
          <input
            class="inpt1
"
            type="text"
            placeholder="Seção"
            name="section"
            onChange={handleAddChange}
          />
          <input
            class="inpt1
"
            type="text"
            name="quantity_item"
            placeholder="Quantidade do Item"
            onChange={handleAddChange}
          />
          <button
            id="bt1"
            class="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Adicionar
          </button>
        </form>
      </div>
      <Link href="/find">
        <button id="bt">Ver tabela</button>
      </Link>
      ;
      <div class="rmv">
        <h2 class="">Remover Item</h2>
        <form onSubmit={handleRemoveSubmit} class="addcontent">
          <input
            class="inpt2"
            type="text"
            placeholder="ID"
            name="id"
            onChange={handleRemoveChange}
          />
          <button
            id="bt2"
            class="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Remover
          </button>
        </form>
      </div>
    </div>
  );
}
