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
    <div>
      <header>Estoque</header>
      <h1>Tabela</h1>
      <div className="container mx-auto p-4">
        <input
          id="pesquisa"
          type="text"
          className="border-2 border-gray-300 p-2 rounded-md"
          placeholder="Digite o id do produto"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <br></br>
        <button
          id="buscar"
          type="submit"
          className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Buscar
        </button>
        {product && ( // se o produto existir, mostra os dados dele
          <div className="mt-4">
            <div className="mt-4">
              <h1 className="text-4xl font-bold"></h1>
              <table class="tabela">
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Quantidade</th>
                  <th>Prateleira</th>
                  <th>Seção</th>
                </tr>
                <tr>
                  <td>{id}</td>
                  <td>{product.productsName.name}</td>
                  <td>{product.quantityItem}</td>
                  <td>{product.stock[0].shelfsSections.shelf}</td>
                  <td>{product.stock[0].shelfsSections.section}</td>
                </tr>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
