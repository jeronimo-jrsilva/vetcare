console.log("Tutor Renderer Carregado!");

const formTutor = document.querySelector('#form-tutor');
const listaTutores = document.querySelector('#lista');
const btnAddPet = document.querySelector('#btn-add-pet');
const petsContainer = document.querySelector('#pets-container');
const btnSubmitTutor = formTutor?.querySelector('button[type="submit"]');

let petIndex = 1; // o bloco 0 já vem pronto no HTML
let editandoId = null; // null = modo cadastro | número = modo edição

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

// Botão "+ Adicionar outro pet": cria um novo bloco de campos
btnAddPet?.addEventListener('click', () => {
  const novoBloco = document.createElement('div');
  novoBloco.classList.add('pet-bloco');
  novoBloco.dataset.petIndex = petIndex;
  novoBloco.innerHTML = `
    <label for="petNome-${petIndex}">Nome do pet</label>
    <input type="text" id="petNome-${petIndex}" class="pet-nome" placeholder="Ex: Thor" required>

    <label for="petIdade-${petIndex}">Idade do pet (em anos)</label>
    <input type="number" id="petIdade-${petIndex}" class="pet-idade" min="0" max="40" required>
  `;
  petsContainer.appendChild(novoBloco);
  petIndex++;
});

// Listar tutores na tela, com botões de editar/excluir
async function carregarTutores() {
  if (!listaTutores) return;
  try {
    const tutores = await window.api.listarTutores();
    if (!tutores || tutores.length === 0) {
      listaTutores.innerHTML = '<li>Nenhum tutor cadastrado ainda.</li>';
      return;
    }

    listaTutores.innerHTML = tutores
      .map(t => `
        <li data-id="${t.id}">
          <strong>👤 ${escapeHTML(t.nome)}</strong><br>
          <small>📞 ${escapeHTML(t.telefone) || 'Sem telefone'} | ✉️ ${escapeHTML(t.email) || 'Sem email'} | CPF: ${escapeHTML(t.cpf) || 'Não informado'}</small><br>
          <small>📍 ${escapeHTML(t.endereco) || 'Endereço não informado'}</small><br>
          <button type="button" class="btn-editar-tutor" data-id="${t.id}">✏️ Editar</button>
          <button type="button" class="btn-excluir-tutor" data-id="${t.id}">✕ Excluir</button>
        </li>
      `)
      .join('');
  } catch (err) {
    console.error("Erro ao listar tutores:", err);
    listaTutores.innerHTML = '<li>Erro ao listar tutores.</li>';
  }
}

// Delegação de eventos: clique em "Editar" ou "Excluir" na lista
listaTutores?.addEventListener('click', async (event) => {
  const id = event.target.dataset.id;
  if (!id) return;

  if (event.target.classList.contains('btn-excluir-tutor')) {
    const confirmar = confirm('Tem certeza que deseja excluir este tutor?');
    if (!confirmar) return;

    const resultado = await window.api.excluirTutor(Number(id));
    if (resultado.success) {
      await carregarTutores();
    } else {
      alert('Erro ao excluir tutor: ' + resultado.error);
    }
  }

  if (event.target.classList.contains('btn-editar-tutor')) {
    const tutores = await window.api.listarTutores();
    const tutor = tutores.find(t => t.id === Number(id));
    if (!tutor) return;

    document.querySelector('#nome').value = tutor.nome || '';
    document.querySelector('#telefone').value = tutor.telefone || '';
    document.querySelector('#email').value = tutor.email || '';
    document.querySelector('#cpf').value = tutor.cpf || '';
    document.querySelector('#endereco').value = tutor.endereco || '';

    editandoId = tutor.id;
    if (btnSubmitTutor) btnSubmitTutor.textContent = 'Salvar alterações';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// Submissão do formulário: CRIAR (tutor + pets) ou EDITAR (só o tutor)
formTutor?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const dadosTutor = {
    nome: document.querySelector('#nome').value.trim(),
    telefone: document.querySelector('#telefone').value.trim(),
    email: document.querySelector('#email').value.trim(),
    cpf: document.querySelector('#cpf').value.trim(),
    endereco: document.querySelector('#endereco').value.trim()
  };

  const { cpf, telefone } = dadosTutor;
  const regexCpf = /^\d{11}$/;
  const regexTelefone = /^\d{10,11}$/;
  let valido = true;

  if (cpf === "") {
    document.querySelector('#erroCpf').textContent = "Preencha o campo CPF";
    valido = false;
  } else if (!regexCpf.test(cpf)) {
    document.querySelector("#erroCpf").textContent = "CPF inválido";
    valido = false;
  } else {
    document.querySelector("#erroCpf").textContent = "";
  }

  if (telefone === "") {
    document.querySelector("#erroTelefone").textContent = "Preencha o campo Telefone";
    valido = false;
  } else if (!regexTelefone.test(telefone)) {
    document.querySelector("#erroTelefone").textContent = "Telefone inválido";
    valido = false;
  } else {
    document.querySelector("#erroTelefone").textContent = "";
  }

  if (!valido) return;

  try {
    // MODO EDIÇÃO: só atualiza os dados do tutor, não mexe em pets
    if (editandoId !== null) {
      const resultado = await window.api.editarTutor(editandoId, dadosTutor);
      if (resultado.success) {
        editandoId = null;
        if (btnSubmitTutor) btnSubmitTutor.textContent = 'Cadastrar tutor';
        formTutor.reset();
        await carregarTutores();
      } else {
        alert('Erro ao editar tutor: ' + resultado.error);
      }
      return;
    }

    // MODO CADASTRO: cria o tutor e todos os pets preenchidos
    const resultadoTutor = await window.api.cadastrarTutor(dadosTutor);

    if (resultadoTutor.success) {
      const nomesPets = document.querySelectorAll('.pet-nome');
      const idadesPets = document.querySelectorAll('.pet-idade');

      for (let i = 0; i < nomesPets.length; i++) {
        const nomePet = nomesPets[i].value.trim();
        const idadePet = idadesPets[i].value.trim();
        if (!nomePet) continue;

        await window.api.cadastrarPet({
          nome: nomePet,
          especie: 'Cachorro',
          raca: 'SRD',
          genero: 'Não especificado',
          data_nascimento: '',
          observacoes: idadePet ? `Idade inicial informada: ${idadePet} anos` : '',
          id_tutor: resultadoTutor.id
        });
      }

      formTutor.reset();
      await carregarTutores();
    } else {
      alert("Erro ao cadastrar tutor: " + resultadoTutor.error);
    }
  } catch (err) {
    console.error("Erro no cadastro/edição:", err);
  }
});

// Inicialização
carregarTutores();