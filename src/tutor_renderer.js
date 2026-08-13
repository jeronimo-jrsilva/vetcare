// Lógica para cadastro de tutores e comunicação com o banco de dados
console.log("Tutor Renderer Carregado!");

const form = document.querySelector('#form-tutor');
const lista = document.querySelector('#lista');

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


 