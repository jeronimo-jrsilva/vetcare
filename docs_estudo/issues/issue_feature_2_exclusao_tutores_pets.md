Contexto
Atualmente, apenas o módulo de Agendamentos possui a funcionalidade de excluir registros. Para completar o ciclo CRUD (Create, Read, Update, Delete) do sistema, precisamos permitir a exclusão de Tutores e Pets com uma confirmação de segurança.

🎯 Tarefas

1. No arquivo main.js:
Adicionar os handlers IPC para deletar registros no SQLite:
```javascript
ipcMain.handle('excluir-tutor', (event, id) => {
  try {
    const stmt = db.prepare('DELETE FROM Tutor WHERE id = ?');
    stmt.run(id);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

ipcMain.handle('excluir-pet', (event, id) => {
  try {
    const stmt = db.prepare('DELETE FROM Pet WHERE id = ?');
    stmt.run(id);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
});
```

2. No arquivo src/preload.js:
Expor os métodos no `window.api`:
```javascript
excluirTutor: (id) => ipcRenderer.invoke('excluir-tutor', id),
excluirPet: (id) => ipcRenderer.invoke('excluir-pet', id),
```

3. No arquivo de renderização (src/tutor_renderer.js e src/pet_renderer.js):
- Adicionar um botão de exclusão em cada `<li>`:
```javascript
<button data-id="${t.id}" class="btn-excluir" style="background:#d97757; width:auto; padding:4px 8px;">Excluir</button>
```
- Criar o ouvinte de clique no `<ul>` com `confirm("Deseja realmente excluir?")` e chamar o `window.api.excluir...()`.

✅ Critério de Aceite (Como Conferir)

- Cada item da lista possui um botão vermelho "Excluir".
- Ao clicar, uma janela de confirmação é exibida para evitar cliques acidentais.
- Se confirmado, o registro é removido do banco SQLite e a lista da tela é recarregada imediatamente.
