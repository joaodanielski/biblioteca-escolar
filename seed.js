const bcrypt = require('bcrypt');
const { Usuario } = require('./models');

async function seed() {
  const usuarios = [
    { nome: 'Admin', email: 'admin@biblioteca.com', perfil: 'admin' },
    { nome: 'Bibliotecário', email: 'biblio@biblioteca.com', perfil: 'bibliotecario' },
    { nome: 'Aluno', email: 'aluno@biblioteca.com', perfil: 'aluno' },
  ];

  const senhaHash = await bcrypt.hash('123456', 10);

  for (const u of usuarios) {
    await Usuario.findOrCreate({
      where: { email: u.email },
      defaults: { ...u, senha: senhaHash },
    });
  }
  console.log('Seed concluído.');
}

module.exports = seed;