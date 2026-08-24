console.log("Login Renderer Carregado!");   

const formLogin = document.querySelector('#form-login');    
const inputUsuario = document.querySelector('#usuario');
const inputSenha = document.querySelector('#senha');
const erroLogin = document.querySelector('#erro-login');

formLogin?.addEventListener('submit', async (e) => {
  e.preventDefault();       

  const usuario = inputUsuario.value.trim();
  const senha = inputSenha.value.trim();

  if (!usuario || !senha) {
    if (erroLogin) erroLogin.textContent = 'Preencha usuário e senha.';
    return;
  }
    
  try {   
    const resultado = await window.api.loginUsuario({ usuario, senha });
    if (resultado.success) {
      // Login bem-sucedido, redirecionar para a página principal
      window.location.href = 'index.html';
    } else {
      if (erroLogin) {
        erroLogin.textContent = resultado.error || 'Usuário ou senha inválidos.';
      } else {
        alert('Falha no login: ' + (resultado.error || 'Usuário ou senha inválidos.'));
      }
    }
  } catch (err) {
    console.error("Erro ao tentar logar:", err);
    if (erroLogin) {
      erroLogin.textContent = 'Erro ao tentar logar.';
    } else {
      alert('Erro ao tentar logar.');
    }
  }
});

