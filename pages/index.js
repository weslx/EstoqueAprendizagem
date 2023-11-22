// Index.js
import React from "react";
import Link from "next/link";
import styles from "../styles/inicial.module.css";

const Index = () => (
  <div className={styles.bodyContainer}>
    <div className={styles.card}>
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
  </div>
);

export default Index;
