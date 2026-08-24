console.log("Pet Renderer Carregado!");

const formPet = document.querySelector('#form-pet');
const selectTutor = document.querySelector('#tutor');
const inputNome = document.querySelector('#nome');
const selectEspecie = document.querySelector('#especie');
const inputRaca = document.querySelector('#raca');
const selectGenero = document.querySelector('#genero');
const inputDataNascimento = document.querySelector('#data_nascimento');
const inputObservacao = document.querySelector('#observacoes');
const listaPets = document.querySelector('#lista');
const btnSubmitPet = formPet?.querySelector('button[type="submit"]');

let editandoIdPet = null; // null = modo cadastro | número = modo edição

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

// Carregar tutores no select
async function carregarTutores() {
  if (!selectTutor) return;
  try {
    const tutores = await window.api.listarTutores();
    selectTutor.innerHTML = '<option value="">Selecione um tutor (opcional)...</option>' +
      tutores.map(t => `<option value="${t.id}">${t.nome}</option>`).join('');
 } catch (err) {
  console.error("Erro ao carregar tutores:", err);
  selectTutor.innerHTML = '<option value="">Erro ao carregar tutores</option>';
}
}

// Carregar pets cadastrados, com botões de editar/excluir
async function carregarPets() {
  if (!listaPets) return;
  try {
    const pets = await window.api.listarPets();
    if (!pets || pets.length === 0) {
      listaPets.innerHTML = '<li>Nenhum pet cadastrado ainda.</li>';
      return;
    }
    
    listaPets.innerHTML = pets
      .map(p => `
        <li>
          <strong>🐾 ${escapeHTML(p.nome)}</strong> — ${escapeHTML(p.especie) || 'Pet'} (${escapeHTML(p.raca) || 'SRD'} • ${escapeHTML(p.genero) || 'N/I'})<br>
          <small>👤 Tutor: ${escapeHTML(p.tutor_nome) || 'Sem tutor vinculado'}</small><br>
          <small>🎂 Nasc: ${escapeHTML(p.data_nascimento) || 'Não informado'} | 📝 Obs: ${escapeHTML(p.observacoes) || 'Nenhuma'}</small>
        </li>
      `)
      .join('');
    } catch (err) {
      console.error("Erro ao carregar pets:", err);
    listaPets.innerHTML = '<li>Erro ao carregar pets.</li>';
  }
}
// Excluir pet
  if (event.target.classList.contains('btn-excluir')) {
    if (!confirm("Deseja realmente cancelar este pet?")) return;

    try {
      await window.api.excluirPet(id);
      await carregarPets();
    } catch (err) {
      console.error("Erro ao excluir pet:", err);
      alert("Erro ao cancelar o pet.");
    }
  }

// Submissão do formulário de pet
formPet?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const dadosPet = {
    nome: inputNome.value.trim(),
    especie: selectEspecie.value,
    raca: inputRaca.value.trim(),
    genero: selectGenero.value,
    data_nascimento: inputDataNascimento.value,
    observacoes: inputObservacao.value.trim(),
    id_tutor: selectTutor.value ? Number(selectTutor.value) : null
  };
if (!dadosPet.nome) {
  alert("O nome do pet é obrigatório.");
  return;
}


  try {
    // MODO EDIÇÃO
    if (editandoIdPet !== null) {
      const resultado = await window.api.editarPet(editandoIdPet, dadosPet);
      if (resultado.success) {
        editandoIdPet = null;
        if (btnSubmitPet) btnSubmitPet.textContent = 'Cadastrar Pet';
        formPet.reset();
        await carregarPets();
      } else {
        alert("Erro ao editar pet: " + resultado.error);
      }
      return;
    }

    // MODO CADASTRO
    const resultado = await window.api.cadastrarPet(dadosPet);
    if (resultado.success) {
      formPet.reset();
      await carregarPets();
    } else {
      alert("Erro ao cadastrar pet: " + resultado.error);
    }
  } catch (err) {
    console.error("Erro ao salvar pet:", err);
  }
});

// Inicialização
carregarTutores();
carregarPets();