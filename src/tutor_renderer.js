console.log("Tutor Renderer Carregado!");

const formTutor = document.querySelector('#form-tutor');
const inputNome = document.querySelector('#nome');
const inputTelefone = document.querySelector('#telefone');
const inputEmail = document.querySelector('#email');
const inputCpf = document.querySelector('#cpf');
const inputEndereco = document.querySelector('#endereco');
const inputNomePet = document.querySelector('#petNome');
const inputIdadePet = document.querySelector('#petIdade');
const listaTutores = document.querySelector('#lista');

// Listar tutores na tela
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
        <li>
          <strong>👤 ${t.nome}</strong><br>
          <small>📞 ${t.telefone || 'Sem telefone'} | ✉️ ${t.email || 'Sem email'} | CPF: ${t.cpf || 'Não informado'}</small><br>
          <small>📍 ${t.endereco || 'Endereço não informado'}</small>
        </li>
      `)
      .join('');
  } catch (err) {
    console.error("Erro ao listar tutores:", err);
  }
}

// Submissão do cadastro de tutor (e pet associado se preenchido)
formTutor?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const dadosTutor = {
    nome: document.querySelector('#nome').value.trim(),
    telefone: document.querySelector('#telefone').value.trim(),
    email: document.querySelector('#email').value.trim(),
    cpf: document.querySelector('#cpf').value.trim(),
    endereco: document.querySelector('#endereco').value.trim()
  };
 const regexCpf = /^\d{11}$/;
 const regexTelefone = /^\d{10,11}$/;
 const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 if (cpf === "") {
  document.querySelector('#erroCpf').textContent = "Preencha o campo CPF";
  valido = false;
 } else if (!regexCpf.test(cpf)){
  document.querySelector("#erroCpf").textContent = "CPF inválido";
  valido = false;
 } else {
  document.querySelector("#erroCpf").textContent = "";
 }

  if (telefone === "") {
  document.querySelector("#erroTelefone").textContent = "Preencha o campo Telefone";
  valido = false;
 } else if (!regexTelefone.test(telefone)){
  document.querySelector("#erroTelefone").textContent = "Telefone inválido";
  valido = false;
 } else {
  document.querySelector("#erroTelefone").textContent = "";
 }


  const petNome = document.querySelector('#petNome')?.value.trim();
  const petIdade = document.querySelector('#petIdade')?.value.trim();

  try {
    const resultadoTutor = await window.api.cadastrarTutor(dadosTutor);
    
    if (resultadoTutor.success) {
      // Se informou o pet junto, já cadastra associando o id_tutor
      if (petNome) {
        await window.api.cadastrarPet({
          nome: petNome,
          especie: 'Cachorro',
          raca: 'SRD',
          genero: 'Não especificado',
          data_nascimento: '',
          observacoes: petIdade ? `Idade inicial informada: ${petIdade} anos` : '',
          id_tutor: resultadoTutor.id
        });
      }

      formTutor.reset();
      await carregarTutores();
    } else {
      alert("Erro ao cadastrar tutor: " + resultadoTutor.error);
    }
  } catch (err) {
    console.error("Erro no cadastro:", err);
  }
});

// Inicialização
carregarTutores();
