const { contextBridge, ipcRenderer } = require('electron');

// Exposição segura de IPC para os scripts de renderização (renderers)
contextBridge.exposeInMainWorld('api', {
  // Tutores
  listarTutores: () => ipcRenderer.invoke('listar-tutores'),
  cadastrarTutor: (dados) => ipcRenderer.invoke('cadastrar-tutor', dados),

  // Pets
  listarPets: () => ipcRenderer.invoke('listar-pets'),
  cadastrarPet: (dados) => ipcRenderer.invoke('cadastrar-pet', dados),

  // Agendamentos
  listarAgendamentos: () => ipcRenderer.invoke('listar-agendamentos'),
  criarAgendamento: (dados) => ipcRenderer.invoke('criar-agendamento', dados),
  excluirAgendamento: (id) => ipcRenderer.invoke('excluir-agendamento', id)
});
