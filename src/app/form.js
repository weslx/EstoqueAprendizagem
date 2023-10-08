// Form.js
import React from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/solid';

const Form = () => {
  return (
    <>
      <form className="mt-12 flex flex-col items-center mr-4 text-black">
        <fieldset className="p-4 border rounded-md shadow-md w-4/5 bg-white">
          <legend className="text-lg font-bold">Adicionar Itens</legend>
          <div className="flex items-center mt-2">
            <label htmlFor="nome" className="mr-2">Nome:</label>
            <input type="text" id="nome" name="nome" className="block w-full p-2 rounded-md shadow-md border-none focus:ring-purple-600 focus:border-purple-600" />
          </div>
          <div className="flex items-center mt-2">
            <label htmlFor="id" className="mr-2">ID:</label>
            <input type="text" id="id" name="id" className="block w-full p-2 rounded-md shadow-md border-none focus:ring-purple-600 focus:border-purple-600" />
          </div>
          <div className="flex items-center mt-2">
            <label htmlFor="localizacao" className="mr-2">Localização:</label>
            <input type="text" id="localizacao" name="localizacao" className="block w-full p-2 rounded-md shadow-md border-none focus:ring-purple-600 focus:border-purple-600" />
          </div>
          <button type="submit" className="flex items-center justify-center w-full p-2 mt-4 bg-purple-600 text-black rounded-md shadow-md border-none hover:bg-purple-700 focus:ring-purple-800 focus:ring-offset-white focus:ring-offset-2 focus:outline-none">
            <PlusIcon className="w-5 h-5 mr-1"/>
            Adicionar
          </button>
        </fieldset>
      </form>
      <form className="mt-12 flex flex-col items-center ml-4 text-black">
        <fieldset className="p-4 border rounded-md shadow-md w-4/5 bg-white">
          <legend className="text-lg font-bold">Remover Itens</legend>
          <div className="flex items-center mt-2">
            <label htmlFor="id2" className="mr-2">ID:</label>
            <input type="text" id="id2" name="id2" className="block w-full p-2 rounded-md shadow-md border-none focus:ring-purple-600 focus:border-purple-600" />
          </div>
          <div className="flex items-center mt-2">
            <label htmlFor="local2" className="mr-2">Local:</label>
            <input type="text" id="local2" name="local2" className="block w-full p-2 rounded-md shadow-md border-none focus:ring-purple-600 focus:border-purple-600" />
          </div>
          <button type="submit" className="flex items-center justify-center w-full p-2 mt-4 bg-purple-600 text-black rounded-md shadow-md border-none hover:bg-purple-700 focus:ring-purple-800 focus:ring-offset-white focus:ring-offset-2 focus:outline-none">
            <MinusIcon className="w-5 h-5 mr-1"/>
            Remover
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default Form;
