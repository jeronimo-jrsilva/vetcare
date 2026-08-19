const inputPesquisa = document.getElementById('pesquisa');
const itensLista = document.querySelectorAll('#pesquisa + ul li');

inputPesquisa.addEventListener('input', function() {
  const termo = inputPesquisa.value.toLowerCase();

  itensLista.forEach(item => {
    const texto = item.textContent.toLowerCase();
    if (texto.includes(termo)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
});
