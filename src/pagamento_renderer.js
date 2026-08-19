console.log("Pagamento Renderer Carregado!");

const formPagamento = document.querySelector('#form-pagamento');
const selectMetodo = document.querySelector('#metodo');
const inputValor = document.querySelector('#valor');
const inputData = document.querySelector('#data');


function getPagamentos() {
  const dados = localStorage.getItem('pagamentos');
  return dados ? JSON.parse(dados) : [];
}


function salvarPagamentos(pagamentos) {
  localStorage.setItem('pagamentos', JSON.stringify(pagamentos));
}


function formatarValor(valor) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}


function formatarData(data) {
  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano}`;
}

function renderizarLista() {
  const pagamentos = getPagamentos();
  lista.innerHTML = '';

  if (pagamentos.length === 0) {
    lista.innerHTML = '<li>Nenhum pagamento registrado ainda.</li>';
    return;
  }

  pagamentos.forEach((pagamento, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${pagamento.metodo}</strong> —
      ${formatarValor(pagamento.valor)} —
      ${formatarData(pagamento.data)}
      <button data-index="${index}" class="btn-remover">🗑️ Remover</button>
    `;
    lista.appendChild(li);
  });

  document.querySelectorAll('.btn-remover').forEach(botao => {
    botao.addEventListener('click', (e) => {
      const idx = e.target.getAttribute('data-index');
      removerPagamento(idx);
    });
  });
}


function removerPagamento(index) {
  const pagamentos = getPagamentos();
  pagamentos.splice(index, 1);
  salvarPagamentos(pagamentos);
  renderizarLista();
}

formPagamento.addEventListener('submit', (e) => {
  e.preventDefault();

  const metodo = selectMetodo.value;
  const valor = inputValor.value;
  const data = inputData.value;

  if (!metodo || !valor || !data) {
    alert('Preencha todos os campos.');
    return;
  }

  const novoPagamento = { metodo, valor, data };

  const pagamentos = getPagamentos();
  pagamentos.push(novoPagamento);
  salvarPagamentos(pagamentos);

  renderizarLista();
  formPagamento.reset();
});

// Carregaento da página
renderizarLista();