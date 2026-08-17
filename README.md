# 🐶 VetCare - Sistema de Gestão Veterinária (MVP Base)

> **Projeto Integrador - Programador de Sistemas / Desenvolvimento de Software**  
> Aplicação Desktop completa construída com **Electron**, **SQLite (better-sqlite3)** e **Vanilla Web (HTML/CSS/JS)**.

---

## 🏗️ Arquitetura do Sistema

O projeto segue a arquitetura segura recomendada pelo Electron em **3 Camadas Desacopladas**:

```
┌─────────────────────────────────────────────────────────┐
│              1. Renderers (Interface / UI)              │
│       index.html | tutor.html | pet.html | agendamento  │
│          (Manipulação de DOM e Formulários)             │
└───────────────────────────┬─────────────────────────────┘
                            │ (window.api via contextBridge)
┌───────────────────────────▼─────────────────────────────┐
│                 2. Preload (Ponte IPC Segura)           │
│                       src/preload.js                    │
│    (Exposição estrita de métodos sem liberar Node/DOM)  │
└───────────────────────────┬─────────────────────────────┘
                            │ (ipcMain.handle / invoke)
┌───────────────────────────▼─────────────────────────────┐
│          3. Main Process & Banco de Dados Relacional    │
│              main.js + database/conexao.js              │
│               (SQLite3 - vetcare.db local)              │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Como Executar o Projeto

### 1. Pré-requisitos
- **Node.js** (versão 18 ou superior instalada).
- **Git** configurado.

### 2. Passo a Passo de Instalação

Abra o terminal na pasta do projeto e execute os passos abaixo:

```bash
# 1. Instalar as dependências do projeto
npm install

# 2. Recompilar o driver nativo do SQLite para a versão do Electron
npx @electron/rebuild

# 3. Iniciar o aplicativo
npm start
```

> [!TIP]
> **No Windows:** Você também pode simplesmente dar um duplo-clique no script **`iniciar.bat`** na raiz da pasta.

---

## 📁 Estrutura de Arquivos

```text
vetcare/
├── database/
│   ├── conexao.js          # Conexão SQLite e auto-criação de tabelas
│   └── schema.sql           # Script DDL com a modelagem relacional
├── src/
│   ├── index.html           # Menu principal e navegação
│   ├── style.css            # Estilos compartilhados
│   ├── preload.js           # Ponte IPC segura (contextBridge)
│   ├── tutor.html           # Tela do Módulo de Tutores
│   ├── tutor_renderer.js    # Lógica de interface de Tutores
│   ├── pet.html             # Tela do Módulo de Pets
│   ├── pet_renderer.js      # Lógica de interface de Pets
│   ├── agendamento.html     # Tela do Módulo de Agendamentos
│   └── agendamento_renderer.js # Lógica de interface de Consultas
├── main.js                  # Processo principal do Electron & IPC Handlers
├── package.json             # Dependências e scripts do projeto
├── iniciar.bat              # Script de inicialização rápida para Windows
└── README.md                # Este manual
```

---

## 🗄️ Modelagem do Banco de Dados (SQLite)

O banco relacional [`vetcare.db`] é auto-inicializado a partir do arquivo [`database/schema.sql`]:

- **`Tutor`**: `id`, `nome`, `telefone`, `email`, `cpf`, `endereco`
- **`Pet`**: `id`, `id_tutor` *(FK)*, `nome`, `raca`, `genero`, `data_nascimento`, `observacoes`
- **`Consulta`**: `id_consulta`, `id_tutor` *(FK)*, `id_pet` *(FK)*, `dia`, `Horario`, `sintoma`, `diagnostico`

---

## 📡 Canais IPC Disponíveis no `window.api`

| Canal / Método | Parâmetros | Descrição |
| :--- | :--- | :--- |
| `window.api.listarTutores()` | *nenhum* | Retorna lista ordenada de todos os tutores cadastrados |
| `window.api.cadastrarTutor(dados)` | `{ nome, telefone, email, cpf, endereco }` | Cadastra novo tutor e retorna `{ success, id }` |
| `window.api.listarPets()` | *nenhum* | Retorna lista de pets com o nome do tutor associado via `JOIN` |
| `window.api.cadastrarPet(dados)` | `{ nome, raca, genero, data_nascimento, observacoes, id_tutor }` | Cadastra novo pet vinculado ao tutor |
| `window.api.listarAgendamentos()` | *nenhum* | Retorna consultas agendadas com dados de tutor e pet cruzados |
| `window.api.criarAgendamento(dados)` | `{ dia, Horario, sintoma, id_tutor, id_pet, diagnostico }` | Cria agendamento de consulta |
| `window.api.excluirAgendamento(id)` | `id_consulta` | Exclui agendamento pelo ID da consulta |
