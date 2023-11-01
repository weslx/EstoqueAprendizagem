import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

function ProductPage() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [products_name, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/api/find/busca`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      })
        .then((res) => res.json())
        .then((data) => setProduct(data));
    }
  }, [id]);
  console.log(products_name);
  return (
    <div className="">
      <h1 id="text">Tabela</h1>
      <div className="container mx-auto p-4">
        <input id="pesquisa" type="text" placeholder="Pesquisa..." />
        <button
          id="buscar"
          type="submit"
          style={{ backgroundColor: "#0a4750" }}
          className="text-white font-bold py-2 px-8 rounded mt-4"
          onClick={(e) => {
            e.preventDefault();
            const input = document.getElementById("pesquisa");
            setId(input.value);
          }}
        >
          Buscar
        </button>
        {products_name && products_name.length > 0 && (
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
