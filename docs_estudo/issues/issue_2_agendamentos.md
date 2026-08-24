Contexto
A tela de agendamentos (src/agendamento.html) atualmente está usando o framework Water.css. Precisamos migrá-la para o Pico.css v2, adotando a mesma estrutura de layout, centralização de 600px e formato da tela de Pets (src/pet.html).

🎯 Tarefas

No arquivo src/agendamento.html:

1. No head, substituir a importação do Water.css pelo Pico.css v2 e o estilo padrão da tela de Pets:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
<link rel="stylesheet" href="style.css">
<style>
  body { max-width: 600px; margin: 40px auto; padding: 0 20px; }
  h1 { color: #f4f4f4; }
</style>
```

2. Padronizar o topo da página com o link de retorno e títulos no mesmo formato da tela de Pets:
```html
<a href="index.html">⬅️ Voltar ao Menu</a>

<h1>📅 Agendamento de Consultas</h1>
<p>Preencha os dados para marcar uma consulta veterinária:</p>
```

3. No formulário `<form id="form-agendamento">`, garantir que todos os campos (`<select>`, `<input type="date">`, `<input type="time">`, etc.) usem o padrão de `<label>` e inputs do Pico.css.

4. Padronizar o título da seção de listagem de consultas:
```html
<h2 style="margin-top: 30px; font-size: 1.3rem;">Consultas Agendadas</h2>
<ul id="lista-agendamentos"></ul>
```

✅ Critério de Aceite (Como Conferir)

- A tela src/agendamento.html não importa mais o Water.css, utilizando o Pico.css v2.
- A página está centralizada com largura máxima de 600px.
- Todos os campos de formulário, botões e títulos seguem exatamente o mesmo visual da tela de Pets.
