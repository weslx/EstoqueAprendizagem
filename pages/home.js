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

    const response = await fetch(
      "https://estoque-aprendizagem.vercel.app/api/add",
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
      `https://estoque-aprendizagem.vercel.app/api/delete/${removeId}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    console.log(data);
  }

  return (
    <div>
      <div>
        <h2>Adicionar Itens</h2>
        <form onSubmit={handleAddSubmit}>
          <input
            type="text"
            name="name"
            placeholder="name"
            onChange={handleAddChange}
          />
          <input
            type="text"
            name="nameId"
            placeholder="Name ID"
            onChange={handleAddChange}
          />
          <input
            type="text"
            name="id"
            placeholder="ID"
            onChange={handleAddChange}
          />
          <input
            type="text"
            name="shelf"
            placeholder="Prateleira"
            onChange={handleAddChange}
          />
          <input
            type="text"
            name="section"
            placeholder="Seção"
            onChange={handleAddChange}
          />
          <input
            type="text"
            name="quantityBox"
            placeholder="Quantidade na Caixa"
            onChange={handleAddChange}
          />
          <input
            type="text"
            name="quantityItem"
            placeholder="Quantidade do Item"
            onChange={handleAddChange}
          />
          <button>Submit</button>
        </form>
      </div>
      <div>
        <h2>Remover Itens</h2>
        <form onSubmit={handleRemoveSubmit}>
          <input
            type="text"
            name="id"
            placeholder="ID"
            onChange={handleRemoveChange}
          />
          <input
            type="text"
            name="local"
            placeholder="Localização"
            onChange={handleRemoveSubmit}
          />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}
