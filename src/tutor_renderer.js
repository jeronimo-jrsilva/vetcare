// Lógica para cadastro de tutores e comunicação com o banco de dados
console.log("Tutor Renderer Carregado!");

const form = document.getElementById('form-tutor');
const lista = document.getElementById('lista');

form.addEventListener ('submit', function (e) {
    e.preventDefault();
});

const nome = document.getElementById('nome').value;
const telefone = document.getElementById('telefone').value;
const email = document.getElementById('email').value;
const cpf = document.getElementById('cpf').value;
const endereco = document.getElementById('endereco').value;
const petNome = document.getElementById('petNome').value;
const petIdade = document.getElementById('petIdade').value;

const item = document.createElement("li");
  item.textContent = nome + " - " + telefone + " - " + email + " - " + cpf + " - Pet: " + petNome + " (" + petIdade + " anos)";

  lista.appendChild(item);
  form.reset();
