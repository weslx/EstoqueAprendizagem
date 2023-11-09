import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

function ProductPage() {
  const router = useRouter();
  const [name, setId] = useState("");
  const [products_name, setProduct] = useState(null);

  useEffect(() => {
    if (name) {
      const namereq = { name: name };
      fetch(`http://localhost:3000/api/find/busca`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(namereq),
      })
        .then((res) => res.json())
        .then((data) => setProduct(data));
    }
  }, [name]);
  console.log(products_name);
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-500 text-white p-4">Estoque</header>
      <h1 className="text-center text-3xl font-bold my-4">Tabela</h1>
      <div className="container mx-auto p-4">
        <input
          id="pesquisa"
          type="text"
          className="border-2 border-gray-300 p-2 rounded-md w-full"
          placeholder="Digite o nome do produto"
        />
        <button
          id="buscar"
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={(e) => {
            e.preventDefault();
            const input = document.getElementById("pesquisa");
            setId(input.value);
          }}
        >
          Buscar
        </button>
        {products_name && products_name.length >= 0 && (
          <div className="mt-4 bg-white p-4 rounded shadow">
            <h1 className="text-xl font-bold mb-2">Detalhes do Produto:</h1>
            <p>Em desenvolvimento, atualmente mostra todos os resultados </p>
            {products_name.map(
              (product_name) =>
                product_name.product &&
                product_name.product.length > 0 && (
                  <table
                    key={product_name.id}
                    className="w-full text-left border-collapse mb-4"
                  >
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border">ID</th>
                        <th className="py-2 px-4 border">Nome</th>
                        <th className="py-2 px-4 border">Quantidade</th>
                        <th className="py-2 px-4 border">Prateleira</th>
                        <th className="py-2 px-4 border">Seção</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product_name.product.map((product) => (
                        <tr key={product.id}>
                          <td className="py-2 px-4 border">{product.id}</td>
                          <td className="py-2 px-4 border">
                            {product_name.name}
                          </td>
                          <td className="py-2 px-4 border">
                            {product.quantity_item}
                          </td>
                          <td className="py-2 px-4 border">
                            {product.shelfs_sections.shelf}
                          </td>
                          <td className="py-2 px-4 border">
                            {product.shelfs_sections.section}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default ProductPage;
