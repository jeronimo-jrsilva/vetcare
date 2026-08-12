console.log("Agendamento Renderer Carregado!");

const formAgendamento = document.getElementById('form-agendamento');
const selectTutor = document.getElementById('tutor');
const selectPet = document.getElementById('pet');
const listaAgendamentos = document.getElementById('lista-agendamentos');

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
  const agendamentos = await window.api.listarAgendamentos();
  listaAgendamentos.innerHTML = agendamentos
    .map(a => `
      <li>
        📅 ${a.data} às ${a.horario} — 🐾 ${a.pet_nome} (tutor: ${a.tutor_nome})
        — Vet: ${a.veterinario} ${a.motivo ? `— Motivo: ${a.motivo}` : ''}
        <button data-id="${a.id}" class="btn-excluir">Excluir</button>
      </li>
    `)
    .join('');
}

// Envio do formulário (criação de novo agendamento)
formAgendamento.addEventListener('submit', async (event) => {
  event.preventDefault();

  const dados = {
    data: document.getElementById('data').value,
    horario: document.getElementById('horario').value,
    veterinario: document.getElementById('veterinario').value,
    motivo: document.getElementById('motivo').value,
    tutor_id: Number(selectTutor.value),
    pet_id: Number(selectPet.value),
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
