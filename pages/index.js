import React from "react";
import Link from "next/link";

const Index = () => (
  <div className="grid grid-cols-1 gap-4 p-4">
    <link href="https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@600&family=Inspiration&family=Kanit:wght@500&display=swap" rel="stylesheet"></link>
    <title>Homepage</title>
    <h1 class='sttitle'>Página Inicial</h1>
    <p class="stsub">Sera necessario fazer login</p>
    <p class="stp">
    <Link href="/home">
    <button class='stb1'>
        Ir para o menu de adicionar/remover item
        <img src="adcrmv.png"></img>
      </button>
    </Link>
    <Link href="/find">
      <button class='stb2'>
        Ir para o menu de ver estoque
      </button>
    </Link>
    </p>
  </div>
);

export default Index;
