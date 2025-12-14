// Importa as bibliotecas
const express = require('express');
const bodyParser = require('body-parser');
// Vamos definir a porta através de variáveis de ambiente no futuro,
// mas por agora, usaremos o padrão 3000
const PORT = 3000;

// Inicializa o aplicativo Express
const app = express();

// Configura o Body-Parser para lidar com dados JSON (essencial para API REST)
app.use(bodyParser.json());

// Importa a configuração do Banco de Dados para estabelecer a conexão e criar as tabelas
require('./config/database'); 

// --- Rotas de Teste (Hello World com Express) ---
app.get('/', (req, res) => {
    res.send('Olá, Mundo! (Servidor Express em funcionamento)');
});

// --- Rotas da ETAPA 2 (Produto) ---
const produtoRoutes = require('./src/routes/produtoRoutes');
app.use('/produtos', produtoRoutes);

// --- Futuras Rotas da ETAPA 2 serão importadas aqui ---
// const produtoRoutes = require('./src/routes/produtoRoutes');
// app.use('/produtos', produtoRoutes);
// ...

// Inicia o servidor e escuta na porta definida
app.listen(PORT, () => {
    console.log(`Servidor Express rodando em http://localhost:${PORT}/`);
});