const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Define o caminho para o arquivo do banco de dados na raiz do projeto
// O arquivo será criado automaticamente se não existir.
const dbPath = path.resolve(__dirname, '..', 'projeto_integrador.db');

// Abre a conexão com o banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
    } else {
        console.log('Conexão com o banco de dados SQLite estabelecida.');
        // Chamamos a função para criar as tabelas
        createTables();
    }
});

// Função para criar as tabelas necessárias
function createTables() {
    // Tabela Produto (Etapa 2 - Controlador 1)
    db.run(`
        CREATE TABLE IF NOT EXISTS Produto (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            descricao TEXT,
            preco REAL NOT NULL,
            codigo_barras TEXT UNIQUE
        );
    `);

    // Tabela Fornecedor (Etapa 2 - Controlador 2)
    db.run(`
        CREATE TABLE IF NOT EXISTS Fornecedor (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            cnpj TEXT UNIQUE NOT NULL,
            endereco TEXT,
            contato TEXT
        );
    `);

    // Tabela de Associação Muitos para Muitos (Etapa 2 - Controlador 3)
    db.run(`
        CREATE TABLE IF NOT EXISTS ProdutoFornecedor (
            produto_id INTEGER,
            fornecedor_id INTEGER,
            PRIMARY KEY (produto_id, fornecedor_id),
            FOREIGN KEY (produto_id) REFERENCES Produto(id) ON DELETE CASCADE,
            FOREIGN KEY (fornecedor_id) REFERENCES Fornecedor(id) ON DELETE CASCADE
        );
    `);
    console.log('Estrutura de tabelas verificada/criada com sucesso.');
}

// Exporta o objeto de conexão com o DB para ser usado nos modelos
module.exports = db;