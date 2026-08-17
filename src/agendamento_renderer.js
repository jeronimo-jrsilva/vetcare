console.log("Agendamento Renderer Carregado!");

const formAgendamento = document.querySelector('#form-agendamento');
const selectTutor = document.querySelector('#tutor');
const selectPet = document.querySelector('#pet');
const listaAgendamentos = document.querySelector('#lista-agendamentos');

// Preenche o <select> de tutores
async function carregarTutores() {
  if (!selectTutor) return;
  try {
    const tutores = await window.api.listarTutores();
    if (!tutores || tutores.length === 0) {
      selectTutor.innerHTML = '<option value="">Nenhum tutor encontrado (cadastre um primeiro)</option>';
      return;
    }
    selectTutor.innerHTML = tutores
      .map(t => `<option value="${t.id}">${t.nome}</option>`)
      .join('');
  } catch (err) {
    console.error("Erro ao carregar tutores:", err);
  }
}

// Preenche o <select> de pets
async function carregarPets() {
  if (!selectPet) return;
  try {
    const pets = await window.api.listarPets();
    if (!pets || pets.length === 0) {
      selectPet.innerHTML = '<option value="">Nenhum pet encontrado (cadastre um primeiro)</option>';
      return;
    }
    selectPet.innerHTML = pets
      .map(p => `<option value="${p.id}">${p.nome} (${p.especie || 'Pet'} • ${p.raca || 'SRD'})</option>`)
      .join('');
  } catch (err) {
    console.error("Erro ao carregar pets:", err);
  }
}

// Lista as consultas já agendadas
async function carregarAgendamentos() {
  if (!listaAgendamentos) return;
  try {
    const consultas = await window.api.listarAgendamentos();
    if (!consultas || consultas.length === 0) {
      listaAgendamentos.innerHTML = '<li>Nenhuma consulta agendada ainda.</li>';
      return;
    }

    listaAgendamentos.innerHTML = consultas
      .map(c => `
        <li style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div>
            <strong>📅 ${c.dia} às ${c.Horario}</strong> — 🐾 <em>${c.pet_nome}</em> (Tutor: ${c.tutor_nome})<br>
            <small>${c.sintoma ? `🩺 Motivo: ${c.sintoma}` : ''} ${c.diagnostico ? `| 👨‍⚕️ Vet: ${c.diagnostico}` : ''}</small>
          </div>
          <button data-id="${c.id_consulta}" class="btn-excluir" style="width: auto; padding: 4px 10px; margin: 0; background: #d97757; color: white; border: none; border-radius: 4px; cursor: pointer;">Excluir</button>
        </li>
      `)
      .join('');
  } catch (err) {
    console.error("Erro ao carregar agendamentos:", err);
  }
}

// Envio do formulário (criação de nova consulta)
formAgendamento?.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!selectTutor.value || !selectPet.value) {
    alert("Selecione um tutor e um pet válidos para agendar a consulta.");
    return;
  }

  const dados = {
    dia: document.querySelector('#data').value,
    Horario: document.querySelector('#horario').value,
    sintoma: document.querySelector('#sintoma').value,
    diagnostico: document.querySelector('#veterinario')?.value || '',
    id_tutor: Number(selectTutor.value),
    id_pet: Number(selectPet.value),
  };

  const resultado = await window.api.criarAgendamento(dados);
  if (resultado.success) {
    formAgendamento.reset();
    await carregarAgendamentos();
  } else {
    alert("Erro ao agendar consulta: " + resultado.error);
  }
});

// Exclusão de consultas (delegação de evento no <ul>)
listaAgendamentos?.addEventListener('click', async (event) => {
  if (event.target.classList.contains('btn-excluir')) {
    const id = event.target.dataset.id;
    if (confirm("Deseja realmente cancelar este agendamento?")) {
      await window.api.excluirAgendamento(id);
      await carregarAgendamentos();
    }
  }
});

// Inicialização
carregarTutores();
carregarPets();
carregarAgendamentos();