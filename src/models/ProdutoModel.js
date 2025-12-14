// Importa a conexão com o banco de dados
const db = require('../../config/database');

const ProdutoModel = {

    // --- 1. Método para CRIAR um novo produto (C do CRUD) ---
    create: (produto, callback) => {
        const { nome, descricao, preco, codigo_barras } = produto;
        const sql = `
            INSERT INTO Produto (nome, descricao, preco, codigo_barras)
            VALUES (?, ?, ?, ?)
        `;
        // db.run é usado para consultas que modificam dados (INSERT, UPDATE, DELETE)
        db.run(sql, [nome, descricao, preco, codigo_barras], function(err) {
            // Retorna o erro ou o ID do novo produto (this.lastID)
            callback(err, this ? this.lastID : null);
        });
    },

    // --- 2. Método para LER todos os produtos (R do CRUD) ---
    findAll: (callback) => {
        const sql = 'SELECT * FROM Produto';
        // db.all é usado para retornar todas as linhas de um SELECT
        db.all(sql, [], callback);
    },

    // --- 3. Método para LER um produto por ID (R do CRUD) ---
    findById: (id, callback) => {
        const sql = 'SELECT * FROM Produto WHERE id = ?';
        // db.get é usado para retornar apenas a primeira linha de um SELECT
        db.get(sql, [id], callback);
    },

    // --- 4. Método para ATUALIZAR um produto (U do CRUD) ---
    update: (id, produto, callback) => {
        const { nome, descricao, preco, codigo_barras } = produto;
        const sql = `
            UPDATE Produto
            SET nome = ?, descricao = ?, preco = ?, codigo_barras = ?
            WHERE id = ?
        `;
        // this.changes indica quantas linhas foram afetadas
        db.run(sql, [nome, nome, descricao, preco, codigo_barras, id], function(err) {
            callback(err, this ? this.changes : 0);
        });
    },

    // --- 5. Método para DELETAR um produto (D do CRUD) ---
    delete: (id, callback) => {
        const sql = 'DELETE FROM Produto WHERE id = ?';
        db.run(sql, [id], function(err) {
            callback(err, this ? this.changes : 0);
        });
    }
};

module.exports = ProdutoModel;