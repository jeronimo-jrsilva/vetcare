const { contextBridge, ipcRenderer } = require('electron');

// Use a contextBridge para expor funções seguras de IPC para o renderer.js
contextBridge.exposeInMainWorld('api', {
  // Exemplo:
  // enviarDados: (dados) => ipcRenderer.invoke('canal-exemplo', dados)
  petNome: (petNome) => ipcRenderer.invoke('canal-exemplo', nome)
  raca: (raca) => ipcRenderer.invoke('canal-exemplo', raca)
  genero: (genero) => ipcRenderer.invoke('canal-exemplo', genero)
  Datadenascimento: (Datadenascimento) => ipcRenderer.invoke('canal-exemplo', nascimento)
  Observacao: (observacao) => ipcRenderer.invoke('canal-exemplo', observacao)
});
