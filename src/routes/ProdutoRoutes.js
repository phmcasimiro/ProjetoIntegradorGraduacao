const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/ProdutoController');

// Rotas CRUD para /produtos

// GET: Lista todos os produtos
router.get('/', ProdutoController.listarProdutos);

// GET: Busca um produto específico por ID
router.get('/:id', ProdutoController.buscarProdutoPorId);

// POST: Cria um novo produto
router.post('/', ProdutoController.criarProduto);

// PUT: Atualiza um produto existente
router.put('/:id', ProdutoController.atualizarProduto);

// DELETE: Deleta um produto por ID
router.delete('/:id', ProdutoController.deletarProduto);

module.exports = router;