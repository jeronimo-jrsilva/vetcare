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
