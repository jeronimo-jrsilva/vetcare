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
