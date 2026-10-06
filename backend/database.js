const Database = require("better-sqlite3");

const db = new Database("pcstore.db");

console.log("Banco de dados conectado!");

// Criar tabela de usuários
db.prepare(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL
    )
`).run();

console.log("Tabela de usuários pronta!");

module.exports = db;