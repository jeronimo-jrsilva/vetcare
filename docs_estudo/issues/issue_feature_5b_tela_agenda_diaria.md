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
