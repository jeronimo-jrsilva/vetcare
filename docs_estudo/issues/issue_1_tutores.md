Contexto
A tela de cadastro de Pets (src/pet.html) foi definida como o padrão visual oficial do VetCare. A tela de Tutores (src/tutor.html) atualmente utiliza estilos customizados antigos e precisa ser refatorada para seguir exatamente a mesma estrutura, framework (Pico.css v2) e medidas da tela de Pets.

🎯 Tarefas

No arquivo src/tutor.html:

1. No head, importar o framework Pico.css v2 e o estilo padrão de centralização da tela de Pets:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
<link rel="stylesheet" href="style.css">
<style>
  body { max-width: 600px; margin: 40px auto; padding: 0 20px; }
  h1 { color: #f4f4f4; }
</style>
```

2. Substituir o cabeçalho antigo pelo padrão de navegação e títulos da tela de Pets:
```html
<a href="index.html">⬅️ Voltar ao Menu</a>

<h1>👤 Cadastro de Tutores</h1>
<p>Preencha os dados para registrar um novo tutor na clínica:</p>
```

3. Simplificar o formulário `<form id="form-tutor">`, removendo divisões e tags antigas, deixando apenas `<label>` e `<input>` diretos como na tela de Pets.

4. Padronizar o título da listagem abaixo do formulário:
```html
<h2 style="margin-top: 30px; font-size: 1.3rem;">Tutores Cadastrados</h2>
<ul id="lista"></ul>
```

✅ Critério de Aceite (Como Conferir)

- O arquivo src/tutor.html está usando o Pico.css v2 e tem largura máxima de 600px centralizada.
- O cabeçalho, formulário, botão e título da lista têm o mesmo tamanho, fontes e espaçamentos da tela de Pets.
- Todo o estilo customizado antigo (fraunces, bordas tracejadas, etc.) foi removido.
