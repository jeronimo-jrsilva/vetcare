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
