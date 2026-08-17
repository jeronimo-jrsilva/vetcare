const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('./database/conexao');

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

  mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'));

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

// Listar todos os tutores
ipcMain.handle('listar-tutores', () => {
  try {
    const stmt = db.prepare('SELECT * FROM Tutor ORDER BY nome ASC');
    return stmt.all();
  } catch (error) {
    console.error('Erro ao listar tutores:', error.message);
    return [];
  }
});

// Cadastrar novo tutor
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

// ==========================================
// CANAIS IPC - PET
// ==========================================

// Listar todos os pets (com nome do tutor via JOIN)
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

// Cadastrar novo pet
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

// ==========================================
// CANAIS IPC - AGENDAMENTO (CONSULTA)
// ==========================================

// Listar agendamentos com JOIN de Pet e Tutor
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

// Criar novo agendamento de consulta
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

// Excluir agendamento pelo ID
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