"use client";
import { useState } from "react";

export default function Home() {
  const [name, setname] = useState("");
  const [nameId, setNameId] = useState("");
  const [id, setId] = useState("");
  const [shelf, setShelf] = useState("");
  const [section, setSection] = useState("");
  const [quantityBox, setQuantityBox] = useState("");
  const [quantityItem, setQuantityItem] = useState("");
  const [removeId, setRemoveId] = useState("");

  const handleAddChange = (e) => {
    switch (e.target.name) {
      case "name":
        setname(e.target.value);
        break;
      case "nameId":
        setNameId(e.target.value);
        break;
      case "id":
        setId(e.target.value);
        break;
      case "shelf":
        setShelf(e.target.value);
        break;
      case "section":
        setSection(e.target.value);
        break;
      case "quantityBox":
        setQuantityBox(e.target.value);
        break;
      case "quantityItem":
        setQuantityItem(e.target.value);
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
      datetime: new Date().toISOString(),
      name,
      nameId,
      id,
      shelf,
      section,
      quantityBox,
      quantityItem,
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
    <div class="content">
      <div class="add">
        <h2>Adicionar Item</h2>
        <div class="addcontent">
          <div class="inputs">
            <form onSubmit={handleAddSubmit}>
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
                name="nameId"
                placeholder="Name ID"
                onChange={handleAddChange}
              />
              <input
                class="inpt1"
                type="text"
                placeholder="Prateleira"
                name="shelf"
                onChange={handleAddChange}
              />
              <input
                class="inpt1"
                type="text"
                placeholder="Seção"
                name="section"
                onChange={handleAddChange}
              />
              <input
                class="inpt1"
                type="text"
                name="quantityBox"
                placeholder="Quantidade na Caixa"
                onChange={handleAddChange}
              />
              <input
                class="inpt1"
                type="text"
                name="quantityItem"
                placeholder="Quantidade do Item"
                onChange={handleAddChange}
              />
              <button id="bt1">Adicionar</button>
            </form>
          </div>
        </div>
      </div>
      <a href="table.html">
        <button id="bt">Ver tabela</button>
      </a>
      <div class="rmv">
        <h2>Remover Item</h2>
        <div class="addcontent">
          <div class="inputs">
            <form onSubmit={handleRemoveSubmit}>
              <input
                class="inpt2"
                type="text"
                placeholder="ID"
                name="id"
                onChange={handleRemoveChange}
              />
              <button id="bt2">Remover</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
