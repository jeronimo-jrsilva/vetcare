console.log("Login Renderer Carregado!");   

const formLogin = document.querySelector('#form-login');    
const inputUsuario = document.querySelector('#usuario');
const inputSenha = document.querySelector('#senha');

formLogin?.addEventListener('submit', async (e) => {
  e.preventDefault();       

    const usuario = inputUsuario.value.trim();
    const senha = inputSenha.value.trim();
    
    try {   
        const resultado = await window.api.loginUsuario({ usuario, senha });
        if (resultado.success) {
            // Login bem-sucedido, redirecionar para a página principal
            window.location.href = 'index.html';
        } else {
            alert('Falha no login: ' + resultado.error);
        }
    } catch (err) {
        console.error("Erro ao tentar logar:", err);
        alert('Erro ao tentar logar. Verifique o console para mais detalhes.');
    }
});

const db = require('./database/schema.sql');

const stmt = db.prepare(`
  INSERT INTO Usuario (usuario, senha)
  VALUES (?, ?)
`);
stmt.run('admin', 1234);

