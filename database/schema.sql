-- Script de Criação do Banco de Dados
-- (Coloque aqui os comandos CREATE TABLE das tabelas tutores, pets e consulta)

CREATE TABLE IF NOT EXISTS "Tutor" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "telefone" TEXT,
    "email" TEXT,
    "cpf" TEXT,
    "endereco" TEXT
);

CREATE TABLE IF NOT EXISTS "Pet" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "raca" TEXT,
    "genero" TEXT,
    "data_nascimento" TEXT,
    "observacoes" TEXT
);

CREATE TABLE IF NOT EXISTS "Consulta" (
	"id_consulta" INTEGER PRIMARY KEY AUTOINCREMENT,
	"id_tutor" INTEGER NOT NULL,
	"dia" TEXT NOT NULL,
	"Horario" TEXT NOT NULL,
	"id_pet" INTEGER NOT NULL,
	"sintoma" TEXT,
	"diagnostico" TEXT,
	FOREIGN KEY("id_tutor") REFERENCES "Tutor"("id"),
	FOREIGN KEY("id_pet") REFERENCES "Pet"("id")
);