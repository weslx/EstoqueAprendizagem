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

  const handleRemoveSubmit = (e) => {
    e.preventDefault();
    console.log({ id: removeId, local });
  };

  return (
    <div className="flex justify-around">
      <div className="w-1/2 p-4">
        <h2 className="text-lg font-bold mb-4">Adicionar Itens</h2>
        <form onSubmit={handleAddSubmit}>
          <input className="block mb-2" type="text" name="nome" placeholder="Nome" onChange={handleAddChange} />
          <input className="block mb-2" type="text" name="cBarras" placeholder="C.Barras" onChange={handleAddChange} />
          <input className="block mb-2" type="text" name="id" placeholder="Id" onChange={handleAddChange} />
          <input className="block mb-2" type="text" name="localizacao" placeholder="Localização" onChange={handleAddChange} />
          <button className="mt-4 p-2 bg-blue-500 text-white">Submit</button>
        </form>
      </div>
      <div className="w-1/2 p-4">
        <h2 className="text-lg font-bold mb-4">Remover Itens</h2>
        <form onSubmit={handleRemoveSubmit}>
          <input className="block mb-2" type="text" name="id" placeholder="Id" onChange={handleRemoveChange} />
          <input className="block mb-2" type="text" name="local" placeholder="Local" onChange={handleRemoveChange} />
          <button className="mt-4 p-2 bg-red-500 text-white">Submit</button>
        </form>
      </div>
    </div>
  );
}
