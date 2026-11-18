const bcrypt = require('bcrypt');
const { Usuario } = require('../../models');

const PERFIS = ['admin', 'bibliotecario', 'aluno'];

// nunca devolve a senha
const publico = (u) => ({ id: u.id, nome: u.nome, email: u.email, perfil: u.perfil });

module.exports = {
  async listar(req, res) {
    const usuarios = await Usuario.findAll({ order: [['nome', 'ASC']] });
    res.json(usuarios.map(publico));
  },

  async buscar(req, res) {
    const u = await Usuario.findByPk(req.params.id);
    if (!u) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json(publico(u));
  },

  async criar(req, res) {
    const { nome, email, senha, perfil } = req.body;
    if (!nome || !email || !senha || !PERFIS.includes(perfil)) {
      return res.status(400).json({ erro: 'Campos obrigatórios: nome, email, senha, perfil válido' });
    }
    try {
      const u = await Usuario.create({ nome, email, senha: await bcrypt.hash(senha, 10), perfil });
      res.status(201).location(`/api/usuarios/${u.id}`).json(publico(u));
    } catch (e) {
      res.status(409).json({ erro: 'E-mail já cadastrado' });
    }
  },

  async atualizar(req, res) {
    const u = await Usuario.findByPk(req.params.id);
    if (!u) return res.status(404).json({ erro: 'Usuário não encontrado' });

    const { nome, email, senha, perfil } = req.body;
    if (perfil && !PERFIS.includes(perfil)) {
      return res.status(400).json({ erro: 'Perfil inválido' });
    }
    try {
      if (nome) u.nome = nome;
      if (email) u.email = email;
      if (perfil) u.perfil = perfil;
      if (senha) u.senha = await bcrypt.hash(senha, 10);
      await u.save();
      res.json(publico(u));
    } catch (e) {
      res.status(409).json({ erro: 'E-mail já cadastrado' });
    }
  },

  async excluir(req, res) {
    if (Number(req.params.id) === req.usuario.id) {
      return res.status(400).json({ erro: 'Você não pode excluir a si mesmo' });
    }
    const u = await Usuario.findByPk(req.params.id);
    if (!u) return res.status(404).json({ erro: 'Usuário não encontrado' });
    await u.destroy();
    res.status(204).send();
  },
};