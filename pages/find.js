import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

function ProductPage() {
  const router = useRouter();
  const [id, setId] = useState(""); // estado para armazenar o id digitado
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`https://estoque-aprendizagem.vercel.app/api/find/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data));
    }
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        className="border-2 border-gray-300 p-2 rounded-md"
        placeholder="Digite o id do produto"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
      >
        Buscar
      </button>
      {product && ( // se o produto existir, mostra os dados dele
        <div className="mt-4">
          <div className="mt-4">
            <h1 className="text-4xl font-bold">
              Nome: {product.productsName.name}
            </h1>
            <p className="text-xl text-gray-600">
              Este é um produto da caixa {product.boxId}
            </p>
            <ul className="list-disc list-inside">
              <li>Quantidade de caixas: {product.quantityBox}</li>
              <li>Quantidade de itens: {product.quantityItem}</li>
              <li>Data da caixa: {product.box.datetime}</li>
              <li>
                Seção da prateleira: {product.stock[0].shelfsSections.shelf}-
                {product.stock[0].shelfsSections.section}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
