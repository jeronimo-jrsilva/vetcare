const { contextBridge, ipcRenderer } = require('electron');

// Exposição segura de IPC para os scripts de renderização (renderers)
contextBridge.exposeInMainWorld('api', {
  // Login
  loginUsuario: (dados) => ipcRenderer.invoke('login-usuario', dados),

  // Tutores
  listarTutores: () => ipcRenderer.invoke('listar-tutores'),
  cadastrarTutor: (dados) => ipcRenderer.invoke('cadastrar-tutor', dados),
  editarTutor: (id, dados) => ipcRenderer.invoke('editar-tutor', id, dados),
  excluirTutor: (id) => ipcRenderer.invoke('excluir-tutor', id),

  // Pets
  listarPets: () => ipcRenderer.invoke('listar-pets'),
  cadastrarPet: (dados) => ipcRenderer.invoke('cadastrar-pet', dados),
  editarPet: (id, dados) => ipcRenderer.invoke('editar-pet', id, dados),
  excluirPet: (id) => ipcRenderer.invoke('excluir-pet', id),
  buscarPets: (termo) => ipcRenderer.invoke('buscar-pet', termo),

  // Agendamentos
  listarAgendamentos: () => ipcRenderer.invoke('listar-agendamentos'),
  criarAgendamento: (dados) => ipcRenderer.invoke('criar-agendamento', dados),
  excluirAgendamento: (id) => ipcRenderer.invoke('excluir-agendamento', id),

  // Histórico Clínico
listarHistoricoPet: (idPet) => ipcRenderer.invoke('listar-historico-pet', idPet),
cadastrarHistorico: (dados) => ipcRenderer.invoke('cadastrar-historico', dados),
excluirHistorico: (id) => ipcRenderer.invoke('excluir-historico', id),
   // Usuário (Login)
  loginUsuario: (dados) => ipcRenderer.invoke('login-usuario', dados),
  cadastrarUsuario: (dados) => ipcRenderer.invoke('cadastrar-usuario', dados),
});

