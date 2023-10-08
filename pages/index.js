"use client"
import { useState } from 'react';

export default function Home() {
  const [nome, setNome] = useState('');
  const [cBarras, setCBarras] = useState('');
  const [id, setId] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [removeId, setRemoveId] = useState('');
  const [local, setLocal] = useState('');

  const handleAddChange = (e) => {
    switch(e.target.name) {
      case 'nome':
        setNome(e.target.value);
        break;
      case 'cBarras':
        setCBarras(e.target.value);
        break;
      case 'id':
        setId(e.target.value);
        break;
      case 'localizacao':
        setLocalizacao(e.target.value);
        break;
    }
  };

  const handleRemoveChange = (e) => {
    switch(e.target.name) {
      case 'id':
        setRemoveId(e.target.value);
        break;
      case 'local':
        setLocal(e.target.value);
        break;
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    console.log({ nome, cBarras, id, localizacao });
  };

  async function handleRemoveSubmit(e) {
    e.preventDefault()
  
    const response = await fetch(`http://localhost:3000/api/delete/${removeId}`, {
      method: 'DELETE',
    })
  
    const data = await response.json()
  
    console.log(data)
  }
  

  return (
    <div>
      <div>
        <h2>Adicionar Itens</h2>
        <form onSubmit={handleAddSubmit}>
          <input type="text" name="nome" placeholder="Nome" onChange={handleAddChange} />
          <input type="text" name="cBarras" placeholder="C.Barras" onChange={handleAddChange} />
          <input type="text" name="id" placeholder="Id" onChange={handleAddChange} />
          <input type="text" name="localizacao" placeholder="Localização" onChange={handleAddChange} />
          <button>Submit</button>
        </form>
      </div>
      <div>
        <h2>Remover Itens</h2>
        <form onSubmit={handleRemoveSubmit}>
          <input type="text" name="id" placeholder="Id" onChange={handleRemoveChange} />
          <input type="text" name="local" placeholder="Local" onChange={handleRemoveSubmit} />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );

}

