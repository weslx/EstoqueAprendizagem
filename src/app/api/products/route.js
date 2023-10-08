export default async function Home() {
  const products = await prisma.products.findMany();
  return (
    <>
      {products.map((product) => (
        <div key={product.id}>
          <h1>{product.products_name_id}</h1>
          <p>{product.box_id}</p>
          <p>{product.quantity_box}</p>
          <p>{product.quantity_item}</p>
        </div>
      ))}
    </>
  );
}
