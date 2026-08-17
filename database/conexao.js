const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Caminho do arquivo do banco de dados SQLite
const dbPath = path.join(__dirname, '..', 'vetcare.db');

// Conexão com o banco (cria o arquivo caso não exista)
const db = new Database(dbPath, { verbose: console.log });

// Inicialização automática das tabelas a partir do schema.sql
const schemaPath = path.join(__dirname, 'schema.sql');
if (fs.existsSync(schemaPath)) {
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');
  db.exec(schemaSql);
}

module.exports = db;
