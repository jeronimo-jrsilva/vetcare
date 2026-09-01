console.log("Histórico Clínico Renderer Carregado!");

const selectPet = document.querySelector('#pet-select');
const formHistorico = document.querySelector('#form-historico');
const selectTipo = document.querySelector('#tipo');
const inputData = document.querySelector('#data');
const inputDescricao = document.querySelector('#descricao');
const inputPeso = document.querySelector('#peso');
const inputMedicamento = document.querySelector('#medicamento_usado');
const inputVeterinario = document.querySelector('#veterinario');
const inputObservacoes = document.querySelector('#observacoes');
const listaHistorico = document.querySelector('#lista-historico');

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

function formatarData(data) {
  if (!data) return 'Não informado';
  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano}`;
}

// Preenche o select com todos os pets cadastrados
async function carregarPets() {
  if (!selectPet) return;
  try {
    const pets = await window.api.listarPets();
    if (!pets || pets.length === 0) {
      selectPet.innerHTML = '<option value="">Nenhum pet cadastrado ainda</option>';
      return;
    }
    selectPet.innerHTML = '<option value="">Selecione um pet...</option>' +
      pets.map(p => `<option value="${p.id}">${escapeHTML(p.nome)} (${escapeHTML(p.tutor_nome) || 'Sem tutor'})</option>`)
        .join('');
  } catch (err) {
    console.error("Erro ao carregar pets:", err);
    selectPet.innerHTML = '<option value="">Erro ao carregar pets</option>';
  }
}

// Carrega o histórico clínico do pet selecionado
async function carregarHistorico(idPet) {
  if (!listaHistorico) return;

  if (!idPet) {
    listaHistorico.innerHTML = '<li>Selecione um pet para ver o histórico.</li>';
    return;
  }

  try {
    const registros = await window.api.listarHistoricoPet(Number(idPet));

    if (!registros || registros.length === 0) {
      listaHistorico.innerHTML = '<li>Nenhum registro clínico para este pet ainda.</li>';
      return;
    }

    listaHistorico.innerHTML = registros.map(r => `
      <li style="margin-bottom: 14px;">
        <strong>📅 ${formatarData(r.data)} — ${escapeHTML(r.tipo)}</strong><br>
        ${r.descricao ? `📝 ${escapeHTML(r.descricao)}<br>` : ''}
        ${r.peso ? `⚖️ Peso: ${r.peso} kg<br>` : ''}
        ${r.medicamento_usado ? `💊 Medicamento: ${escapeHTML(r.medicamento_usado)}<br>` : ''}
        ${r.veterinario ? `👨‍⚕️ Vet: ${escapeHTML(r.veterinario)}<br>` : ''}
        ${r.observacoes ? `<small>${escapeHTML(r.observacoes)}</small><br>` : ''}
        <button data-id="${r.id}" class="btn-excluir-historico" style="width: auto; padding: 4px 10px; margin-top: 4px; background: #d97757; color: white; border: none; border-radius: 4px; cursor: pointer;">🗑️ Excluir</button>
      </li>
    `).join('');
  } catch (err) {
    console.error("Erro ao carregar histórico:", err);
  }
}

// Quando o usuário troca de pet
selectPet?.addEventListener('change', () => {
  carregarHistorico(selectPet.value);
});

// Envio do formulário de novo registro
formHistorico?.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!selectPet.value) {
    alert("Selecione um pet antes de adicionar um registro.");
    return;
  }

  const dados = {
    id_pet: Number(selectPet.value),
    data: inputData.value,
    tipo: selectTipo.value,
    descricao: inputDescricao.value.trim(),
    peso: inputPeso.value ? Number(inputPeso.value) : null,
    medicamento_usado: inputMedicamento.value.trim(),
    veterinario: inputVeterinario.value.trim(),
    observacoes: inputObservacoes.value.trim()
  };

  try {
    const resultado = await window.api.cadastrarHistorico(dados);
    if (resultado.success) {
      formHistorico.reset();
      await carregarHistorico(selectPet.value);
    } else {
      alert("Erro ao adicionar registro: " + resultado.error);
    }
  } catch (err) {
    console.error("Erro ao salvar histórico:", err);
  }
});

// Delegação de evento para excluir registros
listaHistorico?.addEventListener('click', async (e) => {
  if (e.target.classList.contains('btn-excluir-historico')) {
    const id = e.target.dataset.id;
    if (confirm("Deseja realmente excluir este registro do histórico?")) {
      await window.api.excluirHistorico(id);
      await carregarHistorico(selectPet.value);
    }
  }
});

// Inicialização
carregarPets().then(() => {
  carregarHistorico('');
});