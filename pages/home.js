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
  const [message, setMessage] = useState("");

  console.log("render");

  function handleInput1(event) {
    const inputValue = event.target.value;
    const onlyNumbers = inputValue.replace(/[^0-9]/g, "");
    const truncatedInput = onlyNumbers.slice(0, 18);
    event.target.value = truncatedInput;
  }

  function handleInput(event) {
    const inputValue = event.target.value;
    const onlyNumbers = inputValue.replace(/[^0-9]/g, "");
    const truncatedInput = onlyNumbers.slice(0, 3);
    event.target.value = truncatedInput;
  }

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

    try {
      const response = await axios.post("/api/add", item);
      const data = response.data;
      setMessage(`O item foi adicionado com id ${data.id}`);

      setTimeout(() => {
        setMessage("");
      }, 5000);
    } catch (error) {
      setMessage(`Erro ao adicionar item: ${error.response.data.error}`);
    }
  };
  async function handleRemoveSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.delete(`/api/delete/${removeId}`);
      const data = response.data;
      setMessage("O item foi excluído com sucesso");
    } catch (error) {
      setMessage(`Erro ao remover item: ${error.response.data.error}`);
    }
  }

  return (
    <div className="content">
      {message && <div className="message">{message}</div>}
      <div class="add">
        <h2 class="">Adicionar Item</h2>
        <form onSubmit={handleAddSubmit} class="addcontent">
          <div class="inputs">
            <input
              class="inpt1"
              type="text"
              placeholder="Nome e marca ex:(Arroz-Codil)"
              name="name"
              onChange={handleAddChange}
            />
            <input
              class="inpt1"
              type="text"
              name="barcode"
              placeholder="Codigo de barras"
              onChange={handleAddChange}
              onInput={handleInput1}
              pattern="[0-9]*"
              maxLength="10"
            />

            <input
              class="inpt1"
              type="text"
              name="shelf"
              placeholder="Prateleira"
              onChange={handleAddChange}
              pattern="[A-Za-z]*"
              maxLength="1"
            />

            <input
              class="inpt1
"
              type="text"
              placeholder="Seção"
              name="section"
              onChange={handleAddChange}
              onInput={handleInput}
              pattern="[0-9]{1,3}"
              maxLength="2"
            />
            <input
              class="inpt1
"
              type="text"
              name="quantity_item"
              placeholder="Quantidade do Item"
              onChange={handleAddChange}
              onInput={handleInput1}
              pattern="[0-9]*"
              maxLength="2"
            />
            <button
              id="bt1"
              class="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
      <div class="linha"></div>
      <Link href="/find">
        <button id="bt">Ver tabela</button>
      </Link>
      <div class="linha"></div>
      <div class="rmv">
        <h2 class="">Remover Item</h2>
        <form onSubmit={handleRemoveSubmit} class="addcontent">
          <div>
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
          </div>
        </form>
      </div>
    </div>
  );
}
