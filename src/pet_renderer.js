// Lógica para cadastro de pets e comunicação com o banco de dados
console.log("Pet Renderer Carregado!");
const formCad_pet = document.querySelector('#form-cad_pet');
const inputNome = document.querySelector('#nome');
const inputRaca = document.querySelector('#raca');
const inputGenero = document.querySelector('#genero');
const inputDatadenascimento =document.querySelector('#datadenascimento');
const inputObservacao = document.querySelector('#observacao');

formCad_pet.addEventListener('submit', async (e) => {
  e.preventDefault();

  const petNome = inputNome.value.trim();
  const raca = inputEmail.value.trim();
  const genero = inputFoto.value.trim();
  const Datadenascimento = inputTelefone.value.trim();
  const observacao = inputobservacao.value.trim();
});