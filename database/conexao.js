const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Caminho do arquivo do banco de dados SQLite
const dbPath = path.join(__dirname, '..', 'vetcare.db');

// Conexão com o banco (cria o arquivo caso não exista)
const db = new Database(dbPath);

// Inicialização automática das tabelas a partir do schema.sql
const schemaPath = path.join(__dirname, 'schema.sql');
if (fs.existsSync(schemaPath)) {
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');
  db.exec(schemaSql);
}

// Garante que a coluna especie exista em bancos pré-existentes
try {
  const colunas = db.prepare("PRAGMA table_info(Pet)").all();
  const temEspecie = colunas.some(col => col.name === 'especie');
  if (!temEspecie && colunas.length > 0) {
    db.exec("ALTER TABLE Pet ADD COLUMN especie TEXT DEFAULT 'Cachorro'");
  }

  // Garante tabela Usuario e insere admin/1234
  db.exec(`
    CREATE TABLE IF NOT EXISTS "Usuario" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "usuario" TEXT NOT NULL UNIQUE,
      "senha" TEXT NOT NULL,
      "cargo" TEXT DEFAULT 'Funcionario'
    );
    INSERT OR IGNORE INTO "Usuario" ("usuario", "senha", "cargo") VALUES ('admin', '1234', 'Admin');
  `);
} catch (err) {
  console.error("Erro na verificação de tabelas/colunas:", err.message);
}

module.exports = db;
