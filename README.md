# Projeto CRUD de Estoque com React e Next.js

Este é um projeto Next.js inicializado com `create-next-app`.

## Sobre a Aplicação

Esta é uma aplicação web para um aplicativo de gerenciamento de estoque. O usuário pode inserir informações do produto e adicionar ou apagar essas informações do banco de dados.

## Como Iniciar o Projeto

Para iniciar o projeto, você precisará instalar as dependências com `npm i` e depois iniciar o servidor de desenvolvimento com `npm run dev`.

Abra http://localhost:3000 no navegador para ver o resultado.

## Detalhes do Código

- A parte do código onde as informações do front-end são capturadas e enviadas para o back-end usando `useState` e transformadas em string.
- A funcionalidade para deletar um produto do banco de dados está em [http://localhost:3000/api/delete/[id].js](http://localhost:3000/api/delete/[id].js). Ele usa `[id]` pois é uma rota dinâmica criada pelo Next.js.
- A funcionalidade para adicionar ao banco de dados está em `pages/api/add`. Ele recebe uma string de informações e faz a conexão usando Prisma. Esta aplicação foi testada com MySQL local e Postgres do Vercel.

## Saiba Mais

Para aprender mais sobre o Next.js, confira os seguintes recursos:

- Documentação do Next.js - aprenda sobre os recursos e a API do Next.js.
- Aprenda Next.js - um tutorial interativo do Next.js.

Você pode conferir o repositório do Next.js no GitHub - seus comentários e contribuições são bem-vindos!

## Implante na Vercel

A maneira mais fácil de implantar seu aplicativo Next.js é usar a Plataforma Vercel dos criadores do Next.js.

Confira nossa documentação de implantação do Next.js para mais detalhes.
