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

// Carregar tutores no select
async function carregarTutores() {
  if (!selectTutor) return;
  try {
    const tutores = await window.api.listarTutores();
    selectTutor.innerHTML = '<option value="">Selecione um tutor (opcional)...</option>' +
      tutores.map(t => `<option value="${t.id}">${t.nome}</option>`).join('');
  } catch (err) {
    console.error("Erro ao carregar tutores:", err);
  }
}

// Carregar pets cadastrados
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
          <strong>🐾 ${p.nome}</strong> — ${p.especie || 'Pet'} (${p.raca || 'SRD'} • ${p.genero || 'N/I'})<br>
          <small>👤 Tutor: ${p.tutor_nome || 'Sem tutor vinculado'}</small><br>
          <small>🎂 Nasc: ${p.data_nascimento || 'Não informado'} | 📝 Obs: ${p.observacoes || 'Nenhuma'}</small>
        </li>
      `)
      .join('');
  } catch (err) {
    console.error("Erro ao carregar pets:", err);
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

  try {
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