import React from "react";
import Link from "next/link";
import styles from "../styles/inicial.module.css";

const Index = () => (
  <div>
    <link
      href="https://fonts.googleapis.com/css2?family=Bree+Serif&family=Caveat:wght@600&family=Inspiration&family=Kanit:wght@500&display=swap"
      rel="stylesheet"
    />
    <h1 className={styles.sttitle}>Bem na Eskina</h1>
    <p className={styles.stsub}>Será necessário fazer login</p>
    <p className={styles.stp}>
      <Link href="/home" className={styles.stb1}>
        Adicionar e remover item
      </Link>
      <Link href="/find" className={styles.stb2}>
        Menu de estoque
      </Link>
    </p>
  </div>
);

export default Index;
