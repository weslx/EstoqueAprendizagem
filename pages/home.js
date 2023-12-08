"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import styles from "../styles/home.module.css";

export default function Home() {
  const [name, setname] = useState("");
  const [shelf, setShelfs] = useState([]);
  const [barcode, setbarcode] = useState(0); // Inicializado como um número
  const [section, setSection] = useState("");
  const [quantity_item, setQuantityItem] = useState(0);
  const [removeId, setRemoveId] = useState("");
  const [message, setMessage] = useState("");
  const { isSignedIn, user, isLoaded } = useUser();

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
      nome: user.firstName,
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
      setTimeout(() => {
        setMessage("");
      }, 5000);
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
    <div className={styles.content}>
      {message && <div className={styles.message}>{message}</div>}
      <div className={styles.add}>
        <h2 className={styles.title}>Adicionar Item</h2>
        <form onSubmit={handleAddSubmit} className={styles.addcontent}>
          <div className={styles.inputs}>
            <input
              className={styles.inpt1}
              type="text"
              placeholder="Nome e marca ex:(Arroz-Codil)"
              name="name"
              onChange={handleAddChange}
            />
            <input
              className={styles.inpt1}
              type="text"
              name="barcode"
              placeholder="Codigo de barras"
              onChange={handleAddChange}
              onInput={handleInput1}
              pattern="[0-9]*"
              maxLength="10"
            />
            <input
              className={styles.inpt1}
              type="text"
              name="shelf"
              placeholder="Prateleira Ex:(a)"
              onChange={handleAddChange}
              pattern="[A-Za-z]*"
              maxLength="1"
            />
            <input
              className={styles.inpt1}
              type="text"
              placeholder="Seção Ex:(2)"
              name="section"
              onChange={handleAddChange}
              onInput={handleInput}
              pattern="[0-9]{1,3}"
              maxLength="2"
            />
            <input
              className={styles.inpt1}
              type="text"
              name="quantity_item"
              placeholder="Quantidade do Item"
              onChange={handleAddChange}
              onInput={handleInput1}
              pattern="[0-9]*"
              maxLength="2"
            />
            <button id="bt1" className={styles.bt1}>
              Adicionar
            </button>
          </div>
        </form>
      </div>
      <div className={styles.linha}></div>
      <Link href="/find">
        <button className={styles.bt}>Ver tabela</button>
      </Link>
      <div className={styles.linha}></div>
      <div className={styles.rmv}>
        <h2 className={styles.title}>Remover Item</h2>
        <form onSubmit={handleRemoveSubmit} className={styles.addcontent}>
          <div>
            <input
              className={styles.inpt2}
              type="text"
              placeholder="ID"
              name="id"
              onChange={handleRemoveChange}
            />
            <button id="bt2" className={styles.bt2}>
              Remover
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
