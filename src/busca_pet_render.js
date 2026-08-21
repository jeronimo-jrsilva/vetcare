const formPesquisa = document.querySelector('#pesquisa');
const inputbuscar = document.querySelector('#buscar');
const itensLista = document.querySelectorAll('#pesquisa + ul li');

inputbuscar.addEventListener('input', function() {
  const termo = inputbuscar.value.toLowerCase();
  const pets = await window.api.listarPets();
  // itensLista.forEach(item => {
  //   const texto = item.textContent.toLowerCase();
  //   if (texto.includes(termo)) { 
  //     item.style.display = 'block';
  //   } else {
  //     item.style.display = 'none';
  //   }

});
// };

