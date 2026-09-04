console.log("Agendamento Renderer Carregado!");

const formAgendamento = document.querySelector('#form-agendamento');
const selectTutor = document.querySelector('#tutor');
const selectPet = document.querySelector('#pet');
const listaAgendamentos = document.querySelector('#lista-agendamentos');
const btnSubmitAgendamento = formAgendamento?.querySelector('button[type="submit"]');

let editandoIdConsulta = null; // null = modo criação | número = modo edição

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

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
      .map(t => `<option value="${t.id}">${escapeHTML(t.nome)}</option>`)
      .join('');
  } catch (err) {
    console.error("Erro ao carregar tutores:", err);
  }
}

// Preenche o <select> de pets
// Variável para guardar TODOS os pets já carregados do banco
let todosPets = [];

// Preenche o <select> de pets, filtrando pelo tutor selecionado
async function carregarPets() {
  if (!selectPet) return;
  try {
    todosPets = await window.api.listarPets();
    atualizarSelectPets();
  } catch (err) {
    console.error("Erro ao carregar pets:", err);
  }
}

// Filtra os pets já carregados de acordo com o tutor escolhido
function atualizarSelectPets() {
  if (!selectPet) return;

  const idTutorSelecionado = selectTutor.value;

  if (!idTutorSelecionado) {
    selectPet.innerHTML = '<option value="">Selecione um tutor primeiro</option>';
    return;
  }

  const petsDoTutor = todosPets.filter(p => String(p.id_tutor) === String(idTutorSelecionado));

  if (petsDoTutor.length === 0) {
    selectPet.innerHTML = '<option value="">Este tutor não possui pets cadastrados</option>';
    return;
  }

  selectPet.innerHTML = petsDoTutor
    .map(p => `<option value="${p.id}">${escapeHTML(p.nome)} (${escapeHTML(p.especie || 'Pet')} • ${escapeHTML(p.raca || 'SRD')})</option>`)
    .join('');
}

// Sempre que o tutor mudar, re-filtra os pets
selectTutor?.addEventListener('change', atualizarSelectPets);
// Lista as consultas já agendadas, com botões de editar/excluir
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
            <strong>📅 ${escapeHTML(c.dia)} às ${escapeHTML(c.Horario)}</strong> — 🐾 <em>${escapeHTML(c.pet_nome)}</em> (Tutor: ${escapeHTML(c.tutor_nome)})<br>
            <small>${c.sintoma ? `🩺 Motivo: ${escapeHTML(c.sintoma)}` : ''} ${c.diagnostico ? `| 👨‍⚕️ Vet: ${escapeHTML(c.diagnostico)}` : ''}</small>
          </div>
          <div>
            <button data-id="${c.id_consulta}" class="btn-editar" style="width: auto; padding: 4px 10px; margin: 0 4px 0 0; cursor: pointer;">✏️ Editar</button>
            <button data-id="${c.id_consulta}" class="btn-excluir" style="width: auto; padding: 4px 10px; margin: 0; background: #d97757; color: white; border: none; border-radius: 4px; cursor: pointer;">Excluir</button>
          </div>
        </li>
      `)
      .join('');
  } catch (err) {
    console.error("Erro ao carregar agendamentos:", err);
  }
}

// Envio do formulário: cria OU edita, dependendo de editandoIdConsulta
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

  btnSubmitAgendamento.disabled = true;

  try {
    // MODO EDIÇÃO
    if (editandoIdConsulta !== null) {
      const resultado = await window.api.editarAgendamento(editandoIdConsulta, dados);
      if (resultado.success) {
        editandoIdConsulta = null;
        btnSubmitAgendamento.textContent = 'Agendar Consulta';
        formAgendamento.reset();
        await carregarAgendamentos();
      } else {
        alert('Erro ao editar agendamento: ' + resultado.error);
      }
      return;
    }

    // MODO CRIAÇÃO
    const resultado = await window.api.criarAgendamento(dados);
    if (resultado.success) {
      formAgendamento.reset();
      await carregarAgendamentos();
    } else {
      alert("Erro ao agendar consulta: " + resultado.error);
    }
  } catch (err) {
    console.error("Erro ao salvar agendamento:", err);
    alert("Erro inesperado ao salvar o agendamento.");
  } finally {
    btnSubmitAgendamento.disabled = false;
  }
});

// Delegação de evento: editar ou excluir consulta
listaAgendamentos?.addEventListener('click', async (event) => {
  const id = event.target.dataset.id;
  if (!id) return;

  // Excluir
  if (event.target.classList.contains('btn-excluir')) {
    if (!confirm("Deseja realmente cancelar este agendamento?")) return;

    try {
      await window.api.excluirAgendamento(id);
      await carregarAgendamentos();
    } catch (err) {
      console.error("Erro ao excluir agendamento:", err);
      alert("Erro ao cancelar o agendamento.");
    }
  }

  // Editar: preenche o formulário com os dados da consulta clicada
  if (event.target.classList.contains('btn-editar')) {
    try {
      const consultas = await window.api.listarAgendamentos();
      const consulta = consultas.find(c => c.id_consulta === Number(id));
      if (!consulta) return;

      document.querySelector('#data').value = consulta.dia;
      document.querySelector('#horario').value = consulta.Horario;
      document.querySelector('#sintoma').value = consulta.sintoma || '';
      const inputVet = document.querySelector('#veterinario');
      if (inputVet) inputVet.value = consulta.diagnostico || '';
      // Os <select> de tutor/pet já estão carregados desde a inicialização
      selectTutor.value = consulta.id_tutor;
      selectPet.value = consulta.id_pet;

      editandoIdConsulta = consulta.id_consulta;
      btnSubmitAgendamento.textContent = 'Salvar alterações';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error("Erro ao carregar consulta para edição:", err);
    }
  }
});

// Inicialização
carregarTutores();
carregarPets();
carregarAgendamentos();