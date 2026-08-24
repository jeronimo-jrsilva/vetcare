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
