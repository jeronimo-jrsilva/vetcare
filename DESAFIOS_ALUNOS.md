# 📚 Backlog de Desafios & Tarefas: Projeto VetCare MVP

> **Público-Alvo:** Alunos do curso de Programação de Sistemas / Desenvolvimento de Software.  
> **Objetivo:** Evoluir o MVP funcional do **VetCare** adicionando novas regras de negócio, operações CRUD completas, melhorias de UX/UI e consultas relacionais avançadas com SQLite.

---

## 🎯 Mapa de Aprendizagem (Trilha Pedagógica)

```
[🟢 Nível 1: Validação & Busca] ──> [🟡 Nível 2: CRUD Completo & Relacionamentos] ──> [🔴 Nível 3: Prontuário & Dashboard]
```

---

## 🟢 Nível 1 — Validações de Formulário & Busca em Tempo Real (Iniciante)

### 📌 Tarefa 1.1: Máscara e Validação de Formato (CPF e Telefone)
- **Módulo:** `src/tutor.html` / `src/tutor_renderer.js`
- **Desafio:** Implementar máscaras automáticas enquanto o usuário digita nos campos:
  - **CPF:** `000.000.000-00` (11 dígitos).
  - **Telefone:** `(00) 00000-0000` (10 ou 11 dígitos).
- **Conceito Trabalhado:** Eventos de DOM (`input`), manipulação de strings e Expressões Regulares (Regex) em JavaScript.

### 📌 Tarefa 1.2: Campo de Busca / Filtro Dinâmico de Pets
- **Módulo:** `src/pet.html` / `src/pet_renderer.js`
- **Desafio:** Adicionar uma caixa de texto no topo da lista (`<input type="search" placeholder="Buscar por nome ou tutor...">`) que filtre os cards visíveis em tempo real sem recarregar a tela.
- **Conceito Trabalhado:** Método `.filter()` de arrays em JS e manipulação dinâmica de nós DOM.

### 📌 Tarefa 1.3: Tratamento de Datas Futuras no Agendamento
- **Módulo:** `src/agendamento.html` / `src/agendamento_renderer.js`
- **Desafio:** Impedir que o usuário escolha datas retroativas no campo de consulta (`data < hoje`), definindo o atributo `min` do `<input type="date">` com a data atual via JavaScript.
- **Conceito Trabalhado:** Objeto `new Date()`, formatação ISO (`YYYY-MM-DD`).

---

## 🟡 Nível 2 — Edição (UPDATE) e Exclusão Segura (Intermediário)

### 📌 Tarefa 2.1: Edição de Cadastro de Tutor e Pet
- **Módulo:** `main.js`, `src/preload.js`, `src/tutor.html` / `src/pet.html`
- **Desafio:**
  1. Adicionar um botão **"Editar"** ao lado de cada card/item na listagem.
  2. Ao clicar, preencher os campos do formulário com os dados atuais e mudar o botão de "Cadastrar" para "Salvar Alterações".
  3. Criar o canal IPC `atualizar-tutor` no `main.js` executando `UPDATE Tutor SET nome = ?, ... WHERE id = ?`.
- **Conceito Trabalhado:** Ciclo completo de atualização de dados, queries parametrizadas SQL e gerenciamento de estado da interface.

### 📌 Tarefa 2.2: Exclusão com Confirmação e Tratamento de Integridade
- **Módulo:** `main.js`, `src/preload.js`, `src/tutor.html`
- **Desafio:**
  1. Permitir excluir um tutor cadastrado.
  2. **Regra de Negócio Crítica:** Se o tutor tiver pets ou consultas vinculadas, o sistema deve avisar: *"Este tutor possui pets cadastrados. Deseja remover também os pets ou reatribuí-los?"*.
- **Conceito Trabalhado:** Chaves estrangeiras (Foreign Keys), integridade referencial e diálogos modais no Electron.

### 📌 Tarefa 2.3: Status da Consulta (Agendada / Realizada / Cancelada)
- **Módulo:** `database/schema.sql`, `main.js`, `src/agendamento.html`
- **Desafio:**
  1. Adicionar uma nova coluna `status TEXT DEFAULT 'Agendada'` na tabela `Consulta`.
  2. Na tela de agendamentos, exibir um badge colorido com o status:
     - 🟢 **Agendada** (Verde)
     - 🔵 **Realizada** (Azul)
     - 🔴 **Cancelada** (Cinza/Vermelho)
  3. Adicionar botão rápido para "Marcar como Concluída".
- **Conceito Trabalhado:** Migração de banco de dados SQLite (`ALTER TABLE`), estados e classes CSS condicionais.

---

## 🔴 Nível 3 — Prontuário Clínico & Dashboard de Métricas (Avançado)

### 📌 Tarefa 3.1: Prontuário do Pet (Histórico de Consultas / Linha do Tempo)
- **Módulo:** Nova tela `src/prontuario.html` ou modal em `src/pet.html`
- **Desafio:**
  - Ao clicar em um Pet, abrir uma tela detalhada contendo:
    - Foto/Avatar do pet ou ícone da espécie.
    - Idade calculada automaticamente a partir da data de nascimento (`data_nascimento`).
    - Linha do tempo (Timeline) com todas as consultas passadas, sintomas relatados e diagnósticos feitos.
- **Conceito Trabalhado:** Queries com `JOIN` e cláusula `WHERE Pet.id = ? ORDER BY Consulta.dia DESC`.

### 📌 Tarefa 3.2: Dashboard Estatístico na Tela Inicial (`src/index.html`)
- **Módulo:** `src/index.html` / `main.js`
- **Desafio:**
  - Exibir 4 cards de contadores no topo do menu principal:
    1. 👤 **Total de Tutores Ativos** (`SELECT COUNT(*) FROM Tutor`)
    2. 🐾 **Total de Pets Cadastrados** (`SELECT COUNT(*) FROM Pet`)
    3. 📅 **Consultas para Hoje** (`SELECT COUNT(*) FROM Consulta WHERE dia = date('now')`)
    4. 🐕 **Raça Mais Frequente** (`SELECT raca, COUNT(*) as qtd FROM Pet GROUP BY raca ORDER BY qtd DESC LIMIT 1`)
- **Conceito Trabalhado:** Funções de agregação SQL (`COUNT`, `GROUP BY`, `ORDER BY LIMIT`) e criação de canal IPC consolidado `obter-estatisticas-dashboard`.

### 📌 Tarefa 3.3: Exportação de Relatório de Consultas em CSV ou Impressão
- **Módulo:** `src/agendamento.html` / `main.js`
- **Desafio:**
  - Adicionar um botão **"Exportar Relatório"** que gere um arquivo `.csv` ou abra o diálogo nativo de impressão de PDF do Electron (`win.webContents.print()`).
- **Conceito Trabalhado:** Manipulação de arquivos com o módulo `fs` do Node no processo principal ou APIs nativas de impressão do Electron.

---

## 📋 Sugestão de Divisão por Duplas/Grupos

| Grupo | Foco do Desafio | Entregáveis Principais |
| :--- | :--- | :--- |
| **Grupo 1 (Tutores)** | Validação de CPF/Telefone + Edição (`UPDATE`) de Tutores | Formulário blindado, máscara visual e atualização sem recarregar |
| **Grupo 2 (Pets)** | Busca em tempo real + Histórico/Prontuário do Pet | Filtro dinâmico por raça/nome e tela com timeline de consultas |
| **Grupo 3 (Consultas)** | Status da consulta (Agendada/Concluída) + Validação de horários | Evitar choque de horário de consultas no mesmo dia e veterinário |
| **Grupo 4 (Dashboard)** | Estatísticas da Home (`index.html`) + Exportação de dados | Cards com contadores no menu e resumo semanal de atendimentos |
