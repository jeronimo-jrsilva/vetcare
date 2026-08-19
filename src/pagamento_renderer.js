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
    const numero = pagamento.numeroCartao || '';
    const final = numero.slice(-4); 
    return `Cartão terminado em ${final || '----'}`;
  }

  if (pagamento.metodo === 'PIX' && pagamento.chavePix) {
    return `Chave PIX: ${pagamento.chavePix}`;
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

  pagamentos.forEach((pagamento, index) => {
    const detalhesExtras = formatarDetalhesExtras(pagamento);

    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${pagamento.metodo}</strong> —
      ${formatarValor(pagamento.valor)} —
      ${formatarData(pagamento.data)}
      ${detalhesExtras ? `— ${detalhesExtras}` : ''}
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


  if (metodo === 'Cartão de Crédito' || metodo === 'Cartão de Débito') {
    novoPagamento.numeroCartao = inputNumeroCartao.value;
    novoPagamento.nomeCartao = inputNomeCartao.value;
    novoPagamento.validadeCartao = inputValidadeCartao.value;
    novoPagamento.cvvCartao = inputCvvCartao.value;
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