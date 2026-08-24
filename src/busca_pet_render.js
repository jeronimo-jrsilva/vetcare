console.log("Busca Pet Renderer Carregado!");

const formPesquisa = document.querySelector('#pesquisa');
const inputBuscar = document.querySelector('#buscar');
const listaResultados = document.querySelector('#lista-resultados');
const historicoVacina = document.querySelector('#historico-vacina');

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

async function buscarEExibirPets(termo = '') {
  if (!listaResultados) return;
  try {
    const pets = await window.api.buscarPets(termo);
    if (!pets || pets.length === 0) {
      listaResultados.innerHTML = '<li>Nenhum pet encontrado.</li>';
      return;
    }
    listaResultados.innerHTML = pets
      .map(p => `
        <li>
          <strong>🐾 ${escapeHTML(p.nome)}</strong> — ${escapeHTML(p.especie) || 'Pet'} (${escapeHTML(p.raca) || 'SRD'} • ${escapeHTML(p.genero) || 'N/I'})<br>
          <small>👤 Tutor: ${escapeHTML(p.tutor_nome) || 'Sem tutor vinculado'}</small>
        </li>
      `)
      .join('');
  } catch (err) {
    console.error("Erro ao buscar pets:", err);
    listaResultados.innerHTML = '<li>Erro ao buscar pets.</li>';
  }
}

inputBuscar?.addEventListener('input', () => {
  buscarEExibirPets(inputBuscar.value.trim());
});

formPesquisa?.addEventListener('submit', (e) => {
  e.preventDefault();
  buscarEExibirPets(inputBuscar.value.trim());
});

// Carrega todos inicialmente
buscarEExibirPets();