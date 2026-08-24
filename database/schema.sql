-- Script de Criação do Banco de Dados VetCare

CREATE TABLE IF NOT EXISTS "Tutor" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "telefone" NUMBER,
    "email" TEXT,
    "cpf" NUMBER,
    "endereco" TEXT
);

CREATE TABLE IF NOT EXISTS "Pet" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "id_tutor" INTEGER,
    "nome" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "raca" TEXT,
    "genero" TEXT,
    "data_nascimento" NUMBER,
    "observacoes" TEXT,
    FOREIGN KEY("id_tutor") REFERENCES "Tutor"("id")
);

CREATE TABLE IF NOT EXISTS "Consulta" (
    "id_consulta" INTEGER PRIMARY KEY AUTOINCREMENT,
    "id_tutor" INTEGER NOT NULL,
    "id_pet" INTEGER NOT NULL,
    "dia" TEXT NOT NULL,
    "Horario" NUMBER NOT NULL,
    "sintoma" TEXT,
    "diagnostico" TEXT,
    FOREIGN KEY("id_tutor") REFERENCES "Tutor"("id"),
    FOREIGN KEY("id_pet") REFERENCES "Pet"("id")
);

CREATE TABLE IF NOT EXISTS "Usuario" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "usuario" TEXT NOT NULL UNIQUE,
    "senha" TEXT NOT NULL,
    "cargo" TEXT DEFAULT 'Funcionario'
);