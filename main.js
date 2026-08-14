const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron');
const path = require('path');
const db = require('./database/conexao'); // Garante que a conexão com o banco é carregada

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'src', 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile(path.join(__dirname, 'src', 'index.html'));
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
// CANAIS IPC (A serem criados pelos alunos)
// ==========================================


// Listar todos os tutores (preenche o <select>)
ipcMain.handle('listar-tutores', () => {
  try {
    const stmt = db.prepare('SELECT * FROM Tutor ORDER BY nome ASC');
    return stmt.all();
  } catch (error) {
    console.error('Erro ao listar tutores:', error.message);
    return [];
  }
});

// Listar todos os pets (preenche o <select>)
ipcMain.handle('listar-pets', () => {
  try {
    const stmt = db.prepare('SELECT * FROM Pet ORDER BY nome ASC');
    return stmt.all();
  } catch (error) {
    console.error('Erro ao listar pets:', error.message);
    return [];
  }
});

// Listar agendamentos (consultas), trazendo nome do pet e do tutor via JOIN
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

// Criar novo agendamento (consulta)
ipcMain.handle('criar-agendamento', (event, { dia, Horario, sintoma, id_tutor, id_pet }) => {
  try {
    const stmt = db.prepare(`
      INSERT INTO Consulta (dia, Horario, sintoma, id_tutor, id_pet)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(dia, Horario, sintoma, id_tutor, id_pet);
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