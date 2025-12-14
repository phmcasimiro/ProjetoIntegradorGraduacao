// app.js
// Um simples servidor HTTP em Node.js que responde com "Olá, Mundo!"

const http = require('http'); // Importa o módulo HTTP nativo do Node.js

const server = http.createServer((req, res) => { // Cria o servidor HTTP
    res.writeHead(200, {'Content-Type': 'text/plain'}); // Define o cabeçalho da resposta
    res.end('Olá, Mundo!'); // Envia a resposta "Olá, Mundo!"
}); 


const PORT = 3000; // Define a porta onde o servidor irá escutar
server.listen(PORT, () => { // Inicia o servidor e escuta na porta definida
    console.log(`Servidor rodando em http://localhost:${PORT}/`); // Loga a URL do servidor no console
}); 