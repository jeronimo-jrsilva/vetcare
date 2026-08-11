const Database = require('better-sqlite3');
const path = require('path');

// Caminho do arquivo do banco de dados SQLite
const dbPath = path.join(__dirname, '..', 'vetcare.db');

// Conexão com o banco (cria o arquivo caso não exista)
const db = new Database(dbPath, { verbose: console.log });

module.exports = db;
