"use client";
import { useState, useEffect } from "react";
import axios from "axios";

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

    const response = await fetch("http://localhost:3000/api/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

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
      `http://localhost:3000/api/delete/${removeId}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    console.log(data);
  }

  return (
    <div class="flex flex-wrap content-center justify-around p-10 bg-gray-100">
      <div class="w-full sm:w-1/2 p-4 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-4">Adicionar Item</h2>
        <form onSubmit={handleAddSubmit} class="space-y-4">
          <input
            class="w-full p-2 border border-gray-300 rounded"
            type="text"
            placeholder="Nome"
            name="name"
            onChange={handleAddChange}
          />
          <input
            class="w-full p-2 border border-gray-300 rounded"
            type="text"
            name="barcode"
            placeholder="Codigo de barras"
            onChange={handleAddChange}
          />
          <input
            class="w-full p-2 border border-gray-300 rounded"
            type="text"
            name="shelf"
            placeholder="Prateleira"
            onChange={handleAddChange}
          />
          <input
            class="w-full p-2 border border-gray-300 rounded"
            type="text"
            placeholder="Seção"
            name="section"
            onChange={handleAddChange}
          />
          <input
            class="w-full p-2 border border-gray-300 rounded"
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

      <div class="w-full sm:w-1/2 p-4 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-4">Remover Item</h2>
        <form onSubmit={handleRemoveSubmit} class="space-y-4">
          <input
            class="w-full p-2 border border-gray-300 rounded"
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
