// Lógica para cadastro de pets e comunicação com o banco de dados
console.log("Pet Renderer Carregado!");
const formcad_pet = document.querySelector('form-cad_pet');
const inputnome = document.querySelector('nome');
const inputraca = document.querySelector('raca');
const inputgenero = document.querySelector('genero');
const inputDatadenascimento =querySelector document.('Datadenascimento');
const inputobservacao = document.querySelector('observacao');

formContato.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = inputNome.value.trim();
  const reca = inputEmail.value.trim();
  const genero = inputFoto.value.trim();
  const Datadenascimento = inputTelefone.value.trim();
  const observacao = inputobservacao.value.trim ();