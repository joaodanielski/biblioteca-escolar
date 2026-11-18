const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Categoria = require('./Categoria');
const Autor = require('./Autor');
const Livro = require('./Livro');
const Emprestimo = require('./Emprestimo');

// N:N  Livro <-> Autor (cria a tabela LivroAutor)
Livro.belongsToMany(Autor, { through: 'LivroAutor', as: 'autores' });
Autor.belongsToMany(Livro, { through: 'LivroAutor', as: 'livros' });

// 1:N  Categoria -> Livro
Categoria.hasMany(Livro, { foreignKey: 'categoriaId', as: 'livros' });
Livro.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });

// 1:N  Usuario -> Emprestimo
Usuario.hasMany(Emprestimo, { foreignKey: 'usuarioId', as: 'emprestimos' });
Emprestimo.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

// 1:N  Livro -> Emprestimo
Livro.hasMany(Emprestimo, { foreignKey: 'livroId', as: 'emprestimos' });
Emprestimo.belongsTo(Livro, { foreignKey: 'livroId', as: 'livro' });

module.exports = { sequelize, Usuario, Categoria, Autor, Livro, Emprestimo };