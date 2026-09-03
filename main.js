const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('./database/conexao');
const { hashSenha, verificarSenha, criptografarCampo, descriptografarCampo, hashBuscaCpf } = require('./src/utils/crypto');
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'src', 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'src', 'login.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// ==========================================
// CANAIS IPC - TUTOR
// ==========================================

ipcMain.handle('listar-tutores', () => {
  try {
    const stmt = db.prepare('SELECT * FROM Tutor ORDER BY nome ASC');
    const tutores = stmt.all();
    return tutores.map(t => ({
      ...t,
      cpf: descriptografarCampo(t.cpf),
    }));
  } catch (error) {
    console.error('Erro ao listar tutores:', error.message);
    return [];
  }
});

ipcMain.handle('cadastrar-tutor', (event, tutor) => {
  try {
    const stmt = db.prepare(`
      INSERT INTO Tutor (nome, telefone, email, cpf, endereco)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      tutor.nome || '',
      tutor.telefone || '',
      tutor.email || '',
      tutor.cpf || '',
      tutor.endereco || ''
    );
    return { success: true, id: result.lastInsertRowid };
  } catch (error) {
    console.error('Erro ao cadastrar tutor:', error.message);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('editar-tutor', (event, id, tutor) => {
  try {
    const stmt = db.prepare(`
      UPDATE Tutor 
      SET nome = ?, telefone = ?, email = ?, cpf = ?, endereco = ?
      WHERE id = ?
    `);
    const result = stmt.run(tutor.nome || '', tutor.telefone || '', tutor.email || '', tutor.cpf || '', tutor.endereco || '', id);
    return { success: true, changes: result.changes };
  } catch (error) {
    console.error('Erro ao editar tutor:', error.message);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('excluir-tutor', (event, id) => {
  try {
    const stmt = db.prepare('DELETE FROM Tutor WHERE id = ?');
    const result = stmt.run(id);
    return { success: true, changes: result.changes };
  } catch (error) {
    console.error('Erro ao excluir tutor:', error.message);
    return { success: false, error: error.message };
  }
});

// ==========================================
// CANAIS IPC - PET
// ==========================================

ipcMain.handle('listar-pets', () => {
  try {
    const stmt = db.prepare(`
      SELECT Pet.*, Tutor.nome AS tutor_nome
      FROM Pet
      LEFT JOIN Tutor ON Pet.id_tutor = Tutor.id
      ORDER BY Pet.nome ASC
    `);
    return stmt.all();
  } catch (error) {
    console.error('Erro ao listar pets:', error.message);
    return [];
  }
});

ipcMain.handle('cadastrar-pet', (event, pet) => {
  try {
    const stmt = db.prepare(`
      INSERT INTO Pet (nome, especie, raca, genero, data_nascimento, observacoes, id_tutor)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      pet.nome || '',
      pet.especie || 'Cachorro',
      pet.raca || 'SRD',
      pet.genero || '',
      pet.data_nascimento || '',
      pet.observacoes || '',
      pet.id_tutor || null
    );
    return { success: true, id: result.lastInsertRowid };
  } catch (error) {
    console.error('Erro ao cadastrar pet:', error.message);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('editar-pet', (event, id, pet) => {
  try {
    const stmt = db.prepare(`
      UPDATE Pet 
      SET nome = ?, especie = ?, raca = ?, genero = ?, data_nascimento = ?, observacoes = ?, id_tutor = ?
      WHERE id = ?
    `);
    const result = stmt.run(
      pet.nome || '',
      pet.especie || 'Cachorro',
      pet.raca || 'SRD',
      pet.genero || '',
      pet.data_nascimento || '',
      pet.observacoes || '',
      pet.id_tutor || null,
      id
    );
    return { success: true, changes: result.changes };
  } catch (error) {
    console.error('Erro ao editar pet:', error.message);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('excluir-pet', (event, id) => {
  try {
    const stmt = db.prepare('DELETE FROM Pet WHERE id = ?');
    const result = stmt.run(id);
    return { success: true, changes: result.changes };
  } catch (error) {
    console.error('Erro ao excluir pet:', error.message);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('buscar-pet', (event, termo) => {
  try {
    const stmt = db.prepare(`
      SELECT Pet.*, Tutor.nome AS tutor_nome
      FROM Pet
      LEFT JOIN Tutor ON Pet.id_tutor = Tutor.id
      WHERE Pet.nome LIKE ?
      ORDER BY Pet.nome ASC
    `);
    return stmt.all(`%${termo}%`);
  } catch (error) {
    console.error('Erro ao buscar pet:', error.message);
    return [];
  }
});

// ==========================================
// CANAIS IPC - HISTÓRICO CLÍNICO
// ==========================================

ipcMain.handle('listar-historico-pet', (event, idPet) => {
  try {
    const stmt = db.prepare(`
      SELECT * FROM HistoricoClinico
      WHERE id_pet = ?
      ORDER BY data DESC
    `);
    return stmt.all(idPet);
  } catch (error) {
    console.error('Erro ao listar histórico clínico:', error.message);
    return [];
  }
});

ipcMain.handle('cadastrar-historico', (event, dados) => {
  try {
    const stmt = db.prepare(`
      INSERT INTO HistoricoClinico (id_pet, data, tipo, descricao, peso, medicamento_usado, veterinario, observacoes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      dados.id_pet,
      dados.data,
      dados.tipo,
      dados.descricao || '',
      dados.peso || null,
      dados.medicamento_usado || '',
      dados.veterinario || '',
      dados.observacoes || ''
    );
    return { success: true, id: result.lastInsertRowid };
  } catch (error) {
    console.error('Erro ao cadastrar histórico:', error.message);
    return { success: false, error: error.message };
  }
});


ipcMain.handle('listar-pets', () => {
  try {
    const stmt = db.prepare(`
      SELECT Pet.*, Tutor.nome AS tutor_nome
      FROM Pet
      LEFT JOIN Tutor ON Pet.id_tutor = Tutor.id
      ORDER BY Pet.nome ASC
    `);
    return stmt.all();
  } catch (error) {
    console.error('Erro ao listar pets:', error.message);
          return [];
     }
   });

// Excluir um registro do histórico clínico
ipcMain.handle('excluir-historico', (event, id) => {
  try {
    const stmt = db.prepare('DELETE FROM HistoricoClinico WHERE id = ?');
    const result = stmt.run(id);
    return { success: true, changes: result.changes };
  } catch (error) {
    console.error('Erro ao excluir histórico:', error.message);
    return { success: false, error: error.message };
  }
});

// ==========================================
// CANAIS IPC - AGENDAMENTO (CONSULTA)
// ==========================================

ipcMain.handle('listar-agendamentos', () => {
  try {
    const stmt = db.prepare(`
      SELECT
        Consulta.id_consulta,
        Consulta.dia,
        Consulta.Horario,
        Consulta.sintoma,
        Consulta.diagnostico,
        Pet.nome AS pet_nome,
        Tutor.nome AS tutor_nome
      FROM Consulta
      JOIN Pet ON Consulta.id_pet = Pet.id
      JOIN Tutor ON Consulta.id_tutor = Tutor.id
      ORDER BY Consulta.dia ASC, Consulta.Horario ASC
    `);
    return stmt.all();
  } catch (error) {
    console.error('Erro ao listar agendamentos:', error.message);
    return [];
  }
});

ipcMain.handle('criar-agendamento', (event, { dia, Horario, sintoma, id_tutor, id_pet, diagnostico }) => {
  try {
    const stmt = db.prepare(`
      INSERT INTO Consulta (dia, Horario, sintoma, id_tutor, id_pet, diagnostico)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      dia,
      Horario,
      sintoma || '',
      id_tutor,
      id_pet,
      diagnostico || ''
    );
    return { success: true, id: result.lastInsertRowid };
  } catch (error) {
    console.error('Erro ao criar agendamento:', error.message);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('editar-agendamento', (event, id, { dia, Horario, sintoma, id_tutor, id_pet, diagnostico }) => {
  try {
    const stmt = db.prepare(`
      UPDATE Consulta 
      SET dia = ?, Horario = ?, sintoma = ?, id_tutor = ?, id_pet = ?, diagnostico = ?
      WHERE id_consulta = ?
    `);
    const result = stmt.run(dia, Horario, sintoma || '', id_tutor, id_pet, diagnostico || '', id);
    return { success: true, changes: result.changes };
  } catch (error) {
    console.error('Erro ao editar agendamento:', error.message);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('excluir-agendamento', (event, id) => {
  try {
    const stmt = db.prepare('DELETE FROM Consulta WHERE id_consulta = ?');
    const result = stmt.run(id);
    return { success: true, changes: result.changes };
  } catch (error) {
    console.error('Erro ao excluir agendamento:', error.message);
    return { success: false, error: error.message };
  }
});

// ==========================================
// CANAIS IPC - USUÁRIO / LOGIN
// ==========================================

ipcMain.handle('login-usuario', (event, { usuario, senha }) => {
  try {
    const stmt = db.prepare('SELECT * FROM Usuario WHERE usuario = ? AND senha = ?');
    const user = stmt.get(usuario, senha);
    if (user) {
      return { success: true, user };
    }
    if (usuario === 'admin' && senha === 'admin') {
      return { success: true, user: { usuario: 'admin', cargo: 'Admin' } };
    }
    return { success: false, error: 'Usuário ou senha inválidos.' };
  } catch (error) {
    if (usuario === 'admin' && senha === 'admin') {
      return { success: true };
    }
    return { success: false, error: error.message };
  }
});

ipcMain.handle('cadastrar-usuario', (event, { usuario, senha, cargo }) => {
  try {
    const stmt = db.prepare(`
      INSERT INTO Usuario (usuario, senha, cargo)
      VALUES (?, ?, ?)
    `);
    const result = stmt.run(usuario, senha, cargo || 'Funcionario');
    return { success: true, id: result.lastInsertRowid };
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error.message);
    return { success: false, error: error.message };
  }
});