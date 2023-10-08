export default async function handle(req, res) {
    const productId = req.query.id;
  
    if (req.method === 'DELETE') {
      const result = await prisma.products.delete({
        where: { id: Number(productId) },
      });
      res.json(result);
    } else {
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
    }
  }
  