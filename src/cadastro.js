const db = require('./database/schema.sql');

const stmt = db.prepare(`
  INSERT INTO Usuario (usuario, senha)
  VALUES (?, ?)
`);
stmt.run('admin', 1234);
