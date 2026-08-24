Contexto
O sistema permite agendar consultas para datas no passado e não impede que dois pacientes sejam marcados no mesmo dia e horário com o mesmo profissional. Queremos adicionar regras de negócio no formulário de agendamento para tornar a clínica mais realista e organizada.

🎯 Tarefas

No arquivo src/agendamento_renderer.js:

1. Bloquear datas retroativas no calendário HTML definindo a propriedade `min` do campo de data:
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
