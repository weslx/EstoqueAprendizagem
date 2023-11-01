import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Home from "../home"; // Certifique-se de ajustar o caminho para o arquivo home.js

test('renders the "Adicionar Item" section', () => {
  const { getByText, getByPlaceholderText } = render(<Home />);

  expect(getByText("Adicionar Item")).toBeInTheDocument();
  expect(getByPlaceholderText("Nome")).toBeInTheDocument();
  expect(getByPlaceholderText("Prateleira")).toBeInTheDocument();
  expect(getByPlaceholderText("Seção")).toBeInTheDocument();
  expect(getByPlaceholderText("Quantidade do Item")).toBeInTheDocument();
});

test("submits the form for adding an item", async () => {
  const { getByPlaceholderText, getByText } = render(<Home />);

  const nameInput = getByPlaceholderText("Nome");
  const shelfInput = getByPlaceholderText("Prateleira");
  const sectionInput = getByPlaceholderText("Seção");
  const quantityItemInput = getByPlaceholderText("Quantidade do Item");
  const addButton = getByText("Adicionar");

  fireEvent.change(nameInput, { target: { value: "Item Name" } });
  fireEvent.change(shelfInput, { target: { value: "Shelf Name" } });
  fireEvent.change(sectionInput, { target: { value: "Section Name" } });
  fireEvent.change(quantityItemInput, { target: { value: "5" } });

  // Mock the fetch response
  const successResponse = { success: true };
  global.fetch.mockResolvedValueOnce({
    json: async () => successResponse,
    ok: true,
  });

  fireEvent.click(addButton);

  // Wait for the fetch request to complete
  await waitFor(() => {
    // Add assertions to check the data sent to the server
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/add",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          datetime: expect.any(String),
          name: "Item Name",
          id: "",
          shelf: "Shelf Name",
          section: "Section Name",
          quantityItem: "5",
        }),
      })
    );
  });
});
