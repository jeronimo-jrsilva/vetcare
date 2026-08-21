const formPesquisa = document.querySelector('#pesquisa');
const inputbuscar = document.querySelector('#buscar');
const itensLista = document.querySelectorAll('#pesquisa + ul li');

inputbuscar.addEventListener('input', function() {
  const termo = inputbuscar.value.toLowerCase();
  const pets = await window.api.buscarPets(termo);
  try {
    const nomes = pets.map(pet => pet.nome.toLowerCase());
    const texto = termo.toLowerCase();
  }
  catch (err) {
    console.error("Erro ao carregar pets:", err);
  }
      const encontrados = pets.filter(pet =>
          pet.nome.toLowerCase().includes(termo.toLowerCase())
      );
  });