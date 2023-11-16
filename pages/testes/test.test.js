import React from "react";
import { render, screen } from "@testing-library/react";
import Index from "./Index";
import { BrowserRouter as Router } from "react-router-dom";

test("Renderiza o componente Index corretamente", () => {
  render(
    <Router>
      <Index />
    </Router>
  );

  // Verificar se o texto está presente
  expect(screen.getByText("Página Inicial")).toBeInTheDocument();
  expect(screen.getByText("Sera necessario fazer login")).toBeInTheDocument();

  // Verificar se os botões estão presentes
  expect(screen.getByText(/Ir para o menu de adicionar\/remover item/i)).toBeInTheDocument();
  expect(screen.getByText(/Ir para o menu de ver estoque/i)).toBeInTheDocument();
});

// Adicione mais testes conforme necessário
