const { contextBridge, ipcRenderer } = require('electron');

// Exposição segura de IPC para os scripts de renderização (renderers)
contextBridge.exposeInMainWorld('api', {
  // Tutores
  listarTutores: () => ipcRenderer.invoke('listar-tutores'),
  cadastrarTutor: (dados) => ipcRenderer.invoke('cadastrar-tutor', dados),
editarTutor: (id, dados) => ipcRenderer.invoke('editar-tutor', id, dados),
excluirTutor: (id) => ipcRenderer.invoke('excluir-tutor', id),
  // Pets
  listarPets: (nome) => ipcRenderer.invoke('buscar-pets', nome),
  cadastrarPet: (dados) => ipcRenderer.invoke('cadastrar-pet', dados),
editarPet: (id, dados) => ipcRenderer.invoke('editar-pet', id, dados),
excluirPet: (id) => ipcRenderer.invoke('excluir-pet', id),
  // Agendamentos
  editarAgendamento: (id, dados) => ipcRenderer.invoke('editar-agendamento', id, dados),
  listarAgendamentos: () => ipcRenderer.invoke('listar-agendamentos'),
  criarAgendamento: (dados) => ipcRenderer.invoke('criar-agendamento', dados),
  excluirAgendamento: (id) => ipcRenderer.invoke('excluir-agendamento', id)
});
