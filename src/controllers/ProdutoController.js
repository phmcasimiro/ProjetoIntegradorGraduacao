// Importa o modelo que interage com o DB
const ProdutoModel = require('../models/ProdutoModel');

const ProdutoController = {

    // [GET] /produtos
    listarProdutos: (req, res) => {
        ProdutoModel.findAll((err, produtos) => {
            if (err) {
                // Retorna erro 500 em caso de falha no DB
                return res.status(500).json({ error: "Erro ao buscar produtos." });
            }
            // Retorna a lista de produtos (status 200 OK)
            res.status(200).json(produtos);
        });
    },

    // [GET] /produtos/:id
    buscarProdutoPorId: (req, res) => {
        const id = req.params.id;
        ProdutoModel.findById(id, (err, produto) => {
            if (err) {
                return res.status(500).json({ error: "Erro ao buscar o produto." });
            }
            if (!produto) {
                // Retorna erro 404 se o produto não for encontrado
                return res.status(404).json({ error: "Produto não encontrado." });
            }
            res.status(200).json(produto);
        });
    },

    // [POST] /produtos
    criarProduto: (req, res) => {
        const novoProduto = req.body;
        // Validação básica
        if (!novoProduto.nome || !novoProduto.preco) {
            // Retorna erro 400 se faltarem campos obrigatórios
            return res.status(400).json({ error: "Nome e preço são obrigatórios." });
        }

        ProdutoModel.create(novoProduto, (err, id) => {
            if (err) {
                // Erro 400 pode indicar código de barras duplicado (UNIQUE)
                return res.status(400).json({ error: "Erro ao criar produto. Verifique os dados." });
            }
            // Retorna o produto criado com o ID (status 201 Created)
            res.status(201).json({ id, ...novoProduto });
        });
    },

    // [PUT] /produtos/:id
    atualizarProduto: (req, res) => {
        const id = req.params.id;
        const produtoAtualizado = req.body;

        ProdutoModel.update(id, produtoAtualizado, (err, changes) => {
            if (err) {
                return res.status(500).json({ error: "Erro ao atualizar produto." });
            }
            if (changes === 0) {
                // Retorna 404 se nenhuma linha foi atualizada (produto não existe)
                return res.status(404).json({ error: "Produto não encontrado ou nenhum dado alterado." });
            }
            // Retorna 200 e o produto atualizado
            res.status(200).json({ message: "Produto atualizado com sucesso.", id, ...produtoAtualizado });
        });
    },

    // [DELETE] /produtos/:id
    deletarProduto: (req, res) => {
        const id = req.params.id;

        ProdutoModel.delete(id, (err, changes) => {
            if (err) {
                return res.status(500).json({ error: "Erro ao deletar produto." });
            }
            if (changes === 0) {
                return res.status(404).json({ error: "Produto não encontrado." });
            }
            // Retorna 204 No Content para deleção bem-sucedida
            res.status(204).send();
        });
    }
};

module.exports = ProdutoController;