console.log("Pagamento Renderer Carregado!");

const formPagamento = document.querySelector('#form-pagamento');
const selectMetodo = document.querySelector('#metodo');
const inputValor = document.querySelector('#valor');
const inputData = document.querySelector('#data');
const lista = document.querySelector('#lista');

const camposCartao = document.querySelector('#campos-cartao');
const camposPix = document.querySelector('#campos-pix');
const inputNumeroCartao = document.querySelector('#numero-cartao');
const inputNomeCartao = document.querySelector('#nome-cartao');
const inputValidadeCartao = document.querySelector('#validade-cartao');
const inputCvvCartao = document.querySelector('#cvv-cartao');
const inputChavePix = document.querySelector('#chave-pix');

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

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

function formatarDetalhesExtras(pagamento) {
  if (pagamento.metodo === 'Cartão de Crédito' || pagamento.metodo === 'Cartão de Débito') {
    const final = pagamento.numeroCartao || '';
    return `Cartão terminado em ${final || '----'}`;
  }

  if (pagamento.metodo === 'PIX' && pagamento.chavePix) {
    return `Chave PIX: ${escapeHTML(pagamento.chavePix)}`;
  }

  return '';
}

selectMetodo.addEventListener('change', () => {
  const metodo = selectMetodo.value;

  camposCartao.style.display = 'none';
  camposPix.style.display = 'none';

  if (metodo === 'Cartão de Crédito' || metodo === 'Cartão de Débito') {
    camposCartao.style.display = 'block';
  } else if (metodo === 'PIX') {
    camposPix.style.display = 'block';
  }
});

function renderizarLista() {
  const pagamentos = getPagamentos();
  lista.innerHTML = '';

  if (pagamentos.length === 0) {
    lista.innerHTML = '<li>Nenhum pagamento registrado ainda.</li>';
    return;
  }

  pagamentos.forEach((pagamento) => {
    const detalhesExtras = formatarDetalhesExtras(pagamento);

    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${escapeHTML(pagamento.metodo)}</strong> —
      ${formatarValor(pagamento.valor)} —
      ${formatarData(pagamento.data)}
      ${detalhesExtras ? `— ${detalhesExtras}` : ''}
      <button data-id="${pagamento.id}" class="btn-remover">🗑️ Remover</button>
    `;
    lista.appendChild(li);
  });

  document.querySelectorAll('.btn-remover').forEach(botao => {
    botao.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      const confirmar = confirm('Tem certeza que deseja remover este pagamento?');
      if (confirmar) removerPagamento(id);
    });
  });
}

function removerPagamento(id) {
  const pagamentos = getPagamentos();
  const novosPagamentos = pagamentos.filter(p => String(p.id) !== String(id));
  salvarPagamentos(novosPagamentos);
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

  if (Number(valor) <= 0) {
    alert('O valor do pagamento deve ser maior que zero.');
    return;
  }

  const novoPagamento = {
    id: Date.now(),
    metodo,
    valor,
    data
  };

  if (metodo === 'Cartão de Crédito' || metodo === 'Cartão de Débito') {
    novoPagamento.numeroCartao = inputNumeroCartao.value.slice(-4);
    novoPagamento.nomeCartao = inputNomeCartao.value;
    novoPagamento.validadeCartao = inputValidadeCartao.value;
    // CVV não pode ser armazenado por questões de segurança
  } else if (metodo === 'PIX') {
    novoPagamento.chavePix = inputChavePix.value;
  }

  const pagamentos = getPagamentos();
  pagamentos.push(novoPagamento);
  salvarPagamentos(pagamentos);

  renderizarLista();
  formPagamento.reset();

  camposCartao.style.display = 'none';
  camposPix.style.display = 'none';
});

renderizarLista();