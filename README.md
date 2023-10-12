This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Essa e uma web aplicação para um aplicativo de estoque de mercado onde o usuario insere as informaçoes do produto e ele ou adiciona ou apaga as informaçoes do banco de dados

use isso para iniciar o projeto:

```bash
npm i
# e
npm run dev

```

abra [http://localhost:3000](http://localhost:3000) no navegador para ver o resultado.

Parte do codigo onde e pego as informaçoes do front-end e enviando elas para o backend usando useState e tranformado em string `pages/index.js`.

Onde e deletado o produto do banco de dados fica em [http://localhost:3000/api/delete/[id].js](http://localhost:3000/api/delete/[id].js). ele usa [id] pois e uma rota dinamica criada pelo nextJs `pages/api/delete/[id].js`.

Onde e adicionado ao banco fica em `pages/api/add` ele recebe uma string de informaçoes faz a conexão usando prisma [Prisma](https://www.prisma.io/docs). Testei essa aplicação com MySQL local e Postgres do Vercel.

## Saiba Mais

Para aprender mais sobre o Next.js, confira os seguintes recursos:

- [Documentação do Next.js](https://nextjs.org/docs) - aprenda sobre os recursos e a API do Next.js.
- [Aprenda Next.js](https://nextjs.org/learn) - um tutorial interativo do Next.js.

Você pode conferir [o repositório do Next.js no GitHub](https://github.com/vercel/next.js/) - seus comentários e contribuições são bem-vindos!

## Implante na Vercel

A maneira mais fácil de implantar seu aplicativo Next.js é usar a [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) dos criadores do Next.js.

Confira nossa [documentação de implantação do Next.js](https://nextjs.org/docs/deployment) para mais detalhes.

