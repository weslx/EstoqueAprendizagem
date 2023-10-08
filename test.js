// Importe a biblioteca axios para fazer a solicitação HTTP
const axios = require("axios");

// Dados de exemplo para o registro
const userData = {
    box_id: 2,
    products_name_id: 2,
};

// URL da sua rota de registro
const apiUrl = "http://localhost:3000/api/products/update"; // Substitua pelo endereço correto da sua API

// Função para realizar a solicitação de registro
async function registerUser() {
  try {
    const response = await axios.post(apiUrl, userData);
    console.log("Resposta:", response.data);
  } catch (error) {
    console.error(
      "Erro:",
      error.response ? error.response.data : error.message
    );
  }
}

// Chame a função para realizar o registro
registerUser();