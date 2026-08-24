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
