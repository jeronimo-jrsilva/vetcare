const inputPesquisa = document.querySelector('pesquisa');
const inputbuscar = document.querySelector('buscar');
const inputprocurar = document.querySelector('procurar');
const itensLista = document.querySelectorAll('#pesquisa + ul li');

inputPesquisa.addEventListener('input', function() {
  const termo = inputPesquisa.value.toLowerCase();
  const tutores = await window.api.listarTutores();
  itensLista.forEach(item => {
    const texto = item.textContent.toLowerCase();
    if (texto.includes(termo)) { 
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }

});
});

