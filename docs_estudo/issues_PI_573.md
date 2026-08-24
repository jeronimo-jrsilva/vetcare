# 📋 Catálogo Geral de Issues - Projeto Integrador VetCare (PI-573)

> **Documento Consolidado de Tarefas & Features para a Turma**  
> Copie e cole o título e o corpo de cada issue diretamente no GitHub Issues do repositório.

---

## 📑 Sumário das Issues

### 🛠️ Bloco 1: Finalizações & Correções Pendentes
- [Issue 1: Ativar Validação de Regex em Tutores](#issue-1-ativação-de-validação-com-regex-em-tutores)
- [Issue 2: Migrar Agendamentos para Pico.css v2](#issue-2-migração-da-tela-de-agendamentos-para-picocss-v2)
- [Issue 3: Padronizar Larguras (600px) e Limpeza de HTML](#issue-3-padronização-de-largura-600px-e-limpeza-de-tags-legadas)

### 🚀 Bloco 2: Novas Features (Cartas na Manga)
- [Issue 4: Busca em Tempo Real (Tutores e Pets)](#issue-4-barra-de-busca-em-tempo-real-na-lista-de-tutores-e-pets)
- [Issue 5: Exclusão de Tutores e Pets (CRUD Completo)](#issue-5-exclusão-com-confirmação-para-tutores-e-pets)
- [Issue 6: Regras de Negócio e Conflito de Horários](#issue-6-bloquear-datas-passadas-e-conflito-de-horários-em-consultas)
- [Issue 7: Dashboard com Contadores na Tela Inicial](#issue-7-painel-de-indicadores-dashboard-na-tela-inicial)

### 📅 Bloco 3: Módulo de Agenda & Calendário Diário (3 Etapas)
- [Issue 8 (Etapa 1): Filtro por Data e Visão de Hoje](#issue-8-filtro-por-data-na-lista-de-consultas-com-foco-no-dia-atual)
- [Issue 9 (Etapa 2): Tela Dedicada de Agenda Diária](#issue-9-tela-dedicada-de-agenda-diária-srcagendahtml)
- [Issue 10 (Etapa 3): Navegação Interativa entre Dias (Ontem/Amanhã)](#issue-10-navegação-interativa-entre-dias-na-agenda)

---

# 🛠️ BLOCO 1: FINALIZAÇÕES & CORREÇÕES PENDENTES

---

### Issue 1: Ativação de Validação com Regex em Tutores

**Título:**
```text
[Validação] Ativar a verificação de CPF, Telefone e E-mail com regex.test() em Tutores
```

**Labels:** `validation`, `tutores`, `good first issue`

**Corpo da Issue:**

Contexto
No arquivo src/tutor_renderer.js, as expressões regulares (regexCpf, regexTelefone, regexEmail) já foram declaradas com sucesso pela equipe, mas ainda não estão sendo testadas no momento da submissão do formulário. Precisamos adicionar os testes condicionais com .test() para impedir cadastros com dados inválidos.

🎯 Tarefas

No arquivo src/tutor_renderer.js, dentro do ouvinte de submit do formulário:

1. Validar se o nome possui pelo menos 3 caracteres:
```javascript
if (dadosTutor.nome.length < 3) {
  alert("Por favor, digite o nome completo do tutor (mínimo 3 letras).");
  document.querySelector('#nome').focus();
  return;
}
```

2. Validar o CPF usando a regex:
```javascript
if (!regexCpf.test(dadosTutor.cpf)) {
  alert("CPF inválido! Digite exatamente os 11 números do documento.");
  document.querySelector('#cpf').focus();
  return;
}
```

3. Validar o Telefone com DDD:
```javascript
if (!regexTelefone.test(dadosTutor.telefone)) {
  alert("Telefone inválido! Digite o DDD + número (10 ou 11 dígitos).");
  document.querySelector('#telefone').focus();
  return;
}
```

4. Validar o formato do E-mail:
```javascript
if (!regexEmail.test(dadosTutor.email)) {
  alert("E-mail inválido! Digite um endereço no formato nome@dominio.com.");
  document.querySelector('#email').focus();
  return;
}
```

✅ Critério de Aceite (Como Conferir)

- Ao tentar cadastrar um CPF com menos de 11 dígitos ou com letras, o formulário é bloqueado com um alerta claro e o cursor foca no campo CPF.
- Ao tentar cadastrar um telefone ou e-mail inválido, o envio para o SQLite é impedido.
- Se todos os dados estiverem corretos, o tutor é cadastrado com sucesso e a lista atualizada.

---

### Issue 2: Migração da Tela de Agendamentos para Pico.css v2

**Título:**
```text
[UI/UX] Migrar a tela de Agendamentos do Water.css para o Pico.css v2
```

**Labels:** `ui/ux`, `consultas`, `padronização`

**Corpo da Issue:**

Contexto
A tela de agendamento de consultas (src/agendamento.html) é a única que ainda utiliza o framework Water.css. Precisamos migrá-la para o Pico.css v2, padronizando a estrutura, largura máxima (600px) e fontes com as telas de Pets e Tutores.

🎯 Tarefas

No arquivo src/agendamento.html:

1. No head, substituir a importação do Water.css pelo Pico.css v2 e a regra padrão de largura:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
<link rel="stylesheet" href="style.css">
<style>
  body { max-width: 600px; margin: 40px auto; padding: 0 20px; }
  h1 { color: #f4f4f4; }
</style>
```

2. Padronizar o topo da página com o link de retorno e o título do módulo com ícone:
```html
<a href="index.html">⬅️ Voltar ao Menu</a>

<h1>📅 Agendamento de Consultas</h1>
<p>Preencha os dados para marcar uma consulta veterinária:</p>
```

3. No formulário form id="form-agendamento", garantir que todos os campos (select, input date, input time, text) utilizem a estrutura padrão de label e input do Pico.css.

4. Padronizar o título da seção de listagem de consultas:
```html
<h2 style="margin-top: 30px; font-size: 1.3rem;">Consultas Agendadas</h2>
<ul id="lista-agendamentos"></ul>
```

✅ Critério de Aceite (Como Conferir)

- A tela src/agendamento.html não possui mais nenhuma referência ao Water.css.
- A página está centralizada com largura máxima de 600px.
- Todos os campos, selects, botões e cards de consultas seguem a identidade visual do Pico.css.

---

### Issue 3: Padronização de Largura (600px) e Limpeza de Tags Legadas

**Título:**
```text
[UI/UX] Ajustar largura máxima (600px) e limpar tags legadas em Tutores e Pets
```

**Labels:** `ui/ux`, `refactoring`

**Corpo da Issue:**

Contexto
A largura da tela de Pets (src/pet.html) foi alterada para 1500px, o que deixa o formulário excessivamente esticado em monitores grandes. Além disso, a tela de Tutores (src/tutor.html) ainda possui algumas classes residuais do layout anterior que precisam ser limpas.

🎯 Tarefas

1. No arquivo src/pet.html:
Ajustar o estilo de largura máxima do body para 600px:
```html
<style>
  body { max-width: 600px; margin: 40px auto; padding: 0 20px; }
  h1 { color: #f4f4f4; }
</style>
```

2. No arquivo src/tutor.html:
- Adicionar o mesmo bloco de estilo com max-width: 600px no head.
- Remover as classes antigas `<div class="eyebrow">` e `<div class="section-label">`, deixando o formulário limpo e direto como no arquivo de Pets.

✅ Critério de Aceite (Como Conferir)

- As duas telas (Pets e Tutores) abrem perfeitamente centralizadas e com largura máxima harmoniosa de 600px em qualquer tamanho de janela.
- O arquivo src/tutor.html não possui classes ou divs órfãs do tema anterior.

---

# 🚀 BLOCO 2: NOVAS FEATURES (CARTAS NA MANGA)

---

### Issue 4: Barra de Busca em Tempo Real na Lista de Tutores e Pets

**Título:**
```text
[Feature] Adicionar barra de busca em tempo real na lista de Tutores e Pets
```

**Labels:** `feature`, `javascript`, `dom`

**Corpo da Issue:**

Contexto
À medida que a clínica cadastra mais animais e clientes, encontrar um registro específico rolando a página fica trabalhoso. Queremos adicionar uma barra de busca rápida acima da lista de Tutores e Pets para filtrar os registros em tempo real enquanto o usuário digita.

🎯 Tarefas

1. No arquivo HTML (src/tutor.html ou src/pet.html):
Adicionar um campo de busca logo acima da tag `<ul>`:
```html
<input type="search" id="campo-busca" placeholder="🔍 Digite um nome para buscar...">
<ul id="lista"></ul>
```

2. No arquivo JavaScript (src/tutor_renderer.js ou src/pet_renderer.js):
- Guardar a lista completa de registros em uma variável global (ex: `let todosOsTutores = [];`).
- Adicionar um ouvinte de evento input no campo de busca:
```javascript
const campoBusca = document.querySelector('#campo-busca');

campoBusca?.addEventListener('input', (e) => {
  const termo = e.target.value.toLowerCase().trim();
  
  // Filtra os registros pelo nome
  const filtrados = todosOsTutores.filter(t => 
    t.nome.toLowerCase().includes(termo)
  );

  // Renderiza apenas os itens filtrados
  renderizarLista(filtrados);
});
```

✅ Critério de Aceite (Como Conferir)

- Ao digitar qualquer letra na barra de busca, a lista abaixo é filtrada instantaneamente sem recarregar a tela.
- Ao apagar o texto da busca, todos os registros voltam a ser exibidos normalmente.

---

### Issue 5: Exclusão com Confirmação para Tutores e Pets

**Título:**
```text
[Feature] Implementar botão de exclusão com confirmação para Tutores e Pets
```

**Labels:** `feature`, `ipc`, `sqlite`, `crud`

**Corpo da Issue:**

Contexto
Atualmente, apenas o módulo de Agendamentos possui a funcionalidade de excluir registros. Para completar o ciclo CRUD (Create, Read, Update, Delete) do sistema, precisamos permitir a exclusão de Tutores e Pets com uma confirmação de segurança.

🎯 Tarefas

1. No arquivo main.js:
Adicionar os handlers IPC para deletar registros no SQLite:
```javascript
ipcMain.handle('excluir-tutor', (event, id) => {
  try {
    const stmt = db.prepare('DELETE FROM Tutor WHERE id = ?');
    stmt.run(id);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

ipcMain.handle('excluir-pet', (event, id) => {
  try {
    const stmt = db.prepare('DELETE FROM Pet WHERE id = ?');
    stmt.run(id);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
});
```

2. No arquivo src/preload.js:
Expor os métodos no `window.api`:
```javascript
excluirTutor: (id) => ipcRenderer.invoke('excluir-tutor', id),
excluirPet: (id) => ipcRenderer.invoke('excluir-pet', id),
```

3. No arquivo de renderização (src/tutor_renderer.js e src/pet_renderer.js):
- Adicionar um botão de exclusão em cada `<li>`:
```javascript
<button data-id="${t.id}" class="btn-excluir" style="background:#d97757; width:auto; padding:4px 8px;">Excluir</button>
```
- Criar o ouvinte de clique no `<ul>` com `confirm("Deseja realmente excluir?")` e chamar o `window.api.excluir...()`.

✅ Critério de Aceite (Como Conferir)

- Cada item da lista possui um botão vermelho "Excluir".
- Ao clicar, uma janela de confirmação é exibida para evitar cliques acidentais.
- Se confirmado, o registro é removido do banco SQLite e a lista da tela é recarregada imediatamente.

---

### Issue 6: Bloquear Datas Passadas e Conflito de Horários em Consultas

**Título:**
```text
[Regra de Negócio] Bloquear agendamento em datas passadas e horários conflitantes
```

**Labels:** `business-rules`, `consultas`, `validation`

**Corpo da Issue:**

Contexto
O sistema permite agendar consultas para datas no passado e não impede que dois pacientes sejam marcados no mesmo dia e horário com o mesmo profissional. Queremos adicionar regras de negócio no formulário de agendamento para tornar a clínica mais realista e organizada.

🎯 Tarefas

No arquivo src/agendamento_renderer.js:

1. Bloquear datas retroativas no calendário HTML definindo a propriedade min do campo de data:
```javascript
const inputData = document.querySelector('#data');
if (inputData) {
  const hoje = new Date().toISOString().split('T')[0];
  inputData.min = hoje; // Impede clicar em dias anteriores no calendário
}
```

2. No evento de submit, verificar se já existe uma consulta agendada no mesmo dia e horário:
```javascript
const consultasExistentes = await window.api.listarAgendamentos();

const conflito = consultasExistentes.some(c => 
  c.dia === dados.dia && c.Horario === dados.Horario
);

if (conflito) {
  alert("Horário indisponível! Já existe uma consulta agendada para este dia e horário.");
  return;
}
```

✅ Critério de Aceite (Como Conferir)

- O seletor de calendário não permite selecionar datas anteriores ao dia atual.
- Ao tentar cadastrar duas consultas na mesma data e horário, o sistema bloqueia com uma mensagem de alerta de conflito.

---

### Issue 7: Painel de Indicadores (Dashboard) na Tela Inicial

**Título:**
```text
[Feature] Criar painel de indicadores (Dashboard) na tela inicial do sistema
```

**Labels:** `feature`, `dashboard`, `ui/ux`

**Corpo da Issue:**

Contexto
A tela inicial (src/index.html) atualmente possui apenas links para navegar entre os módulos. Queremos adicionar um mini painel informativo (Dashboard) com 3 cards exibindo os totais de Tutores cadastrados, Pets cadastrados e Consultas agendadas.

🎯 Tarefas

1. No arquivo src/index.html:
Adicionar uma seção de indicadores acima dos botões de navegação:
```html
<section style="display: flex; gap: 15px; margin-bottom: 30px;">
  <article style="flex: 1; text-align: center; padding: 15px;">
    <h3 style="margin: 0;" id="total-tutores">0</h3>
    <small>👤 Tutores</small>
  </article>
  <article style="flex: 1; text-align: center; padding: 15px;">
    <h3 style="margin: 0;" id="total-pets">0</h3>
    <small>🐾 Pets</small>
  </article>
  <article style="flex: 1; text-align: center; padding: 15px;">
    <h3 style="margin: 0;" id="total-consultas">0</h3>
    <small>📅 Consultas</small>
  </article>
</section>
```

2. Criar ou atualizar o script da tela inicial (ex: src/index_renderer.js):
```javascript
async function carregarTotais() {
  const tutores = await window.api.listarTutores();
  const pets = await window.api.listarPets();
  const agendamentos = await window.api.listarAgendamentos();

  document.querySelector('#total-tutores').textContent = tutores.length;
  document.querySelector('#total-pets').textContent = pets.length;
  document.querySelector('#total-consultas').textContent = agendamentos.length;
}

carregarTotais();
```

✅ Critério de Aceite (Como Conferir)

- Ao abrir o aplicativo, a tela inicial exibe os números atualizados de tutores, pets e consultas.
- Se cadastrar um novo pet ou consulta, ao voltar ao menu principal os contadores refletem a quantidade real do banco.

---

# 📅 BLOCO 3: MÓDULO DE AGENDA & CALENDÁRIO DIÁRIO (3 ETAPAS)

---

### Issue 8: Filtro por Data na Lista de Consultas (Com foco no Dia Atual)

**Título:**
```text
[Feature] Adicionar filtro por data na lista de agendamentos com foco no dia atual
```

**Labels:** `agenda`, `consultas`, `feature`

**Corpo da Issue:**

Contexto
Atualmente, a lista de agendamentos exibe todas as consultas misturadas, passadas e futuras. Na rotina real de uma clínica veterinária, a recepção e os veterinários precisam ver imediatamente o que está agendado para o dia de HOJE, com opção de escolher outra data rapidamente.

🎯 Tarefas

No arquivo src/agendamento.html e src/agendamento_renderer.js:

1. No HTML (acima da lista de consultas), adicionar a barra de filtro de data com botões rápidos:
```html
<div style="display: flex; gap: 10px; align-items: center; margin-bottom: 20px;">
  <label for="filtro-data" style="margin: 0;">Filtrar por data:</label>
  <input type="date" id="filtro-data" style="margin: 0; width: auto;">
  <button id="btn-hoje" type="button" style="width: auto; margin: 0; padding: 6px 12px;">Hoje</button>
  <button id="btn-todas" type="button" class="secondary" style="width: auto; margin: 0; padding: 6px 12px;">Ver todas</button>
</div>
```

2. No JavaScript (src/agendamento_renderer.js):
- Ao inicializar a tela, definir o valor do `#filtro-data` automaticamente para a data de hoje:
```javascript
const filtroData = document.querySelector('#filtro-data');
const hoje = new Date().toISOString().split('T')[0];
if (filtroData) filtroData.value = hoje;
```

- Filtrar as consultas pela data selecionada:
```javascript
filtroData?.addEventListener('change', (e) => {
  const dataEscolhida = e.target.value;
  const filtradas = todasAsConsultas.filter(c => c.dia === dataEscolhida);
  renderizarConsultas(filtradas);
});

document.querySelector('#btn-hoje')?.addEventListener('click', () => {
  filtroData.value = hoje;
  renderizarConsultas(todasAsConsultas.filter(c => c.dia === hoje));
});

document.querySelector('#btn-todas')?.addEventListener('click', () => {
  filtroData.value = '';
  renderizarConsultas(todasAsConsultas);
});
```

✅ Critério de Aceite (Como Conferir)

- Ao abrir a tela, o filtro já vem preenchido com o dia de hoje e a lista exibe apenas as consultas do dia atual.
- Ao mudar a data no calendário, a listagem atualiza instantaneamente para exibir as consultas daquele dia.
- O botão "Ver todas" limpa o filtro e mostra o histórico completo.

---

### Issue 9: Tela Dedicada de Agenda Diária (`src/agenda.html`)

**Título:**
```text
[Feature] Criar tela dedicada de Agenda Diária da Clínica (ordem cronológica)
```

**Labels:** `agenda`, `feature`, `ui/ux`

**Corpo da Issue:**

Contexto
Para dar uma visão profissional à clínica, queremos criar uma tela exclusiva de "Agenda do Dia" (src/agenda.html), voltada para o veterinário acompanhar a fila de atendimentos em ordem cronológica de horário.

🎯 Tarefas

1. Criar a página src/agenda.html:
- Usar o Pico.css v2 e layout de 600px centralizado.
- Cabeçalho com data por extenso e contador:
```html
<a href="index.html">⬅️ Voltar ao Menu</a>

<h1>📋 Agenda do Dia</h1>
<p id="data-extenso" style="font-weight: bold; color: #10b981;"></p>
<p id="contador-consultas">Carregando consultas...</p>

<ul id="lista-agenda"></ul>
```

2. Adicionar o link de acesso no menu principal (src/index.html):
```html
<a href="agenda.html" role="button">📋 Ver Agenda do Dia</a>
```

3. Criar o script src/agenda_renderer.js:
- Formatar a data atual por extenso:
```javascript
const hoje = new Date();
const opcoes = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
document.querySelector('#data-extenso').textContent = hoje.toLocaleDateString('pt-BR', opcoes);

const hojeIso = hoje.toISOString().split('T')[0];
```
- Carregar as consultas do dia e ordenar por horário:
```javascript
async function carregarAgendaDoDia() {
  const todas = await window.api.listarAgendamentos();
  const doDia = todas
    .filter(c => c.dia === hojeIso)
    .sort((a, b) => a.Horario.localeCompare(b.Horario));

  document.querySelector('#contador-consultas').textContent = 
    doDia.length > 0 ? `${doDia.length} consulta(s) agendada(s) para hoje:` : 'Nenhuma consulta para hoje.';

  const lista = document.querySelector('#lista-agenda');
  lista.innerHTML = doDia.map(c => `
    <li style="margin-bottom: 12px;">
      <span style="font-size: 1.2rem; font-weight: bold;">⏰ ${c.Horario}</span> — <strong>🐾 ${c.pet_nome}</strong> (Tutor: ${c.tutor_nome})<br>
      <small>🩺 ${c.sintoma || 'Consulta de rotina'} | 👨‍⚕️ Vet: ${c.diagnostico || 'Geral'}</small>
    </li>
  `).join('');
}

carregarAgendaDoDia();
```

✅ Critério de Aceite (Como Conferir)

- A tela inicial possui um botão "Ver Agenda do Dia" que abre a nova tela.
- A tela exibe a data formatada em português (ex: "terça-feira, 18 de agosto de 2026").
- As consultas do dia são listadas em ordem cronológica de horário (ex: 09:00 antes de 14:00).

---

### Issue 10: Navegação Interativa entre Dias na Agenda

**Título:**
```text
[Feature] Adicionar botões de navegação dia a dia na Agenda (Dia Anterior / Próximo Dia)
```

**Labels:** `agenda`, `interactive`, `javascript`

**Corpo da Issue:**

Contexto
Queremos transformar a tela de Agenda em uma experiência interativa, permitindo que a recepção navegue de um dia para o outro através de botões [ ◀ Dia Anterior ] e [ Próximo Dia ▶ ], ou clicando diretamente nos dias da semana.

🎯 Tarefas

No arquivo src/agenda.html e src/agenda_renderer.js:

1. No HTML (src/agenda.html), adicionar a barra de navegação de dias:
```html
<nav style="display: flex; justify-content: space-between; align-items: center; margin: 20px 0;">
  <button id="btn-anterior" type="button" class="secondary" style="width: auto;">◀ Dia Anterior</button>
  <strong id="data-selecionada-titulo" style="font-size: 1.1rem;">Hoje</strong>
  <button id="btn-proximo" type="button" class="secondary" style="width: auto;">Próximo Dia ▶</button>
</nav>
```

2. No JavaScript (src/agenda_renderer.js):
- Criar uma variável para controlar a data em exibição e funções para avançar/retroceder dias:
```javascript
let dataAtual = new Date();

function atualizarVisualizacao() {
  const ano = dataAtual.getFullYear();
  const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
  const dia = String(dataAtual.getDate()).padStart(2, '0');
  const dataIso = `${ano}-${mes}-${dia}`;

  // Atualiza o texto do cabeçalho
  const opcoes = { weekday: 'short', day: 'numeric', month: 'short' };
  document.querySelector('#data-selecionada-titulo').textContent = dataAtual.toLocaleDateString('pt-BR', opcoes);

  // Filtra e exibe as consultas do dia calculado
  const doDia = todasAsConsultas.filter(c => c.dia === dataIso);
  renderizarLista(doDia);
}

document.querySelector('#btn-anterior')?.addEventListener('click', () => {
  dataAtual.setDate(dataAtual.getDate() - 1);
  atualizarVisualizacao();
});

document.querySelector('#btn-proximo')?.addEventListener('click', () => {
  dataAtual.setDate(dataAtual.getDate() + 1);
  atualizarVisualizacao();
});
```

✅ Critério de Aceite (Como Conferir)

- Ao clicar em "Próximo Dia ▶", a data avança em 1 dia e a lista carrega as consultas daquele dia específico.
- Ao clicar em "◀ Dia Anterior", a data retrocede e as consultas correspondentes são exibidas.
- A navegação é suave e não recarrega a página.
