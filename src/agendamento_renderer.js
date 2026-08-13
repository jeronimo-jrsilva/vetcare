console.log("Agendamento Renderer Carregado!");

const formAgendamento = document.querySelector('#form-agendamento');
const selectTutor = document.querySelector('#tutor');
const selectPet = document.querySelector('#pet');
const listaAgendamentos = document.querySelector('#lista-agendamentos');

// Preenche o <select> de tutores
async function carregarTutores() {
  const tutores = await window.api.listarTutores();
  selectTutor.innerHTML = tutores
    .map(t => `<option value="${t.id}">${t.nome}</option>`)
    .join('');
}

// Preenche o <select> de pets
async function carregarPets() {
  const pets = await window.api.listarPets();
  selectPet.innerHTML = pets
    .map(p => `<option value="${p.id}">${p.nome}</option>`)
    .join('');
}

// Lista as consultas já agendadas
async function carregarAgendamentos() {
  const consultas = await window.api.listarAgendamentos();
  listaAgendamentos.innerHTML = consultas
    .map(c => `
      <li>
        📅 ${c.dia} às ${c.Horario} — 🐾 ${c.pet_nome} (tutor: ${c.tutor_nome})
        ${c.sintoma ? `— Sintoma: ${c.sintoma}` : ''}
        ${c.diagnostico ? `— Diagnóstico: ${c.diagnostico}` : ''}
        <button data-id="${c.id_consulta}" class="btn-excluir">Excluir</button>
      </li>
    `)
    .join('');
}

// Envio do formulário (criação de nova consulta)
formAgendamento.addEventListener('submit', async (event) => {
  event.preventDefault();

  const dados = {
    dia: document.querySelector('#data').value,
    Horario: document.querySelector('#horario').value,
    sintoma: document.querySelector('#sintoma').value,
    id_tutor: Number(selectTutor.value),
    id_pet: Number(selectPet.value),
  };

  await window.api.criarAgendamento(dados);
  formAgendamento.reset();
  carregarAgendamentos();
});

// Exclusão de consultas (delegação de evento no <ul>)
listaAgendamentos.addEventListener('click', async (event) => {
  if (event.target.classList.contains('btn-excluir')) {
    const id = event.target.dataset.id;
    await window.api.excluirAgendamento(id);
    carregarAgendamentos();
  }
});

// Inicialização
carregarTutores();
carregarPets();
carregarAgendamentos();