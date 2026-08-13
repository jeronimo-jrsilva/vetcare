// Lógica para cadastro de tutores e comunicação com o banco de dados
console.log("Tutor Renderer Carregado!");

<<<<<<< HEAD
const form = document.querySelector('#form-tutor');
const lista = document.querySelector('#lista');
=======
<<<<<<< HEAD
const form = document.getElementById('form-tutor');
const lista = document.getElementById('lista');
>>>>>>> 9f83ca7 (tutor rendere parte 1)

form.addEventListener ('submit', function (e) {
    e.preventDefault();
});

const nome = document.querySelector('#nome').value;
const nome = document.querySelector('#telefone').value;
const nome = document.querySelector('#email').value;
const nome = document.querySelector('#cpf').value;
const nome = document.querySelector('endereco').value;
const nome = document.querySelector('#petNome').value;
const nome = document.querySelector('#petIdade').value;


const item = document.createElement("li");
  item.textContent = nome + " - " + telefone + " - " + email + " - " + cpf + " - Pet: " + petNome + " (" + petIdade + " anos)";

  lista.appendChild(item);
  form.reset();
<<<<<<< HEAD


 
=======
=======
async function cadastrarTutor(dados) {
  const resultado = await window.tutorAPI.cadastrar(dados);
  if (resultado.sucesso) {
    console.log('Tutor cadastrado! ID:', resultado.id);
  } else {
    console.error('Erro ao cadastrar:', resultado.erro);
  }
  return resultado;
}

document.getElementById('form-tutor')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const dados = {
    nome: e.target.nome.value,
    email: e.target.email.value,
    telefone: e.target.telefone.value,
    especialidade: e.target.especialidade.value,
  };
  await cadastrarTutor(dados);
});
>>>>>>> 19b1d8e (tutor rendere parte 1)
>>>>>>> 9f83ca7 (tutor rendere parte 1)
