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
- Adicionar um ouvinte de evento `input` no campo de busca:
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
