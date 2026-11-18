const bcrypt = require('bcrypt');
const { Usuario } = require('../models');

const PERFIS = ['admin', 'bibliotecario', 'aluno'];

module.exports = {
  async listar(req, res) {
    const usuarios = await Usuario.findAll({ order: [['nome', 'ASC']] });
    res.render('usuarios/index', { usuarios });
  },

  formNovo(req, res) {
    res.render('usuarios/form', { u: null, perfis: PERFIS, erro: null });
  },

  async criar(req, res) {
    try {
      const { nome, email, senha, perfil } = req.body;
      const senhaHash = await bcrypt.hash(senha, 10);
      await Usuario.create({ nome, email, senha: senhaHash, perfil });
      res.redirect('/usuarios');
    } catch (e) {
      res.status(400).render('usuarios/form', {
        u: null, perfis: PERFIS, erro: 'E-mail já cadastrado ou dados inválidos',
      });
    }
  },

  async formEditar(req, res) {
    const u = await Usuario.findByPk(req.params.id);
    if (!u) return res.status(404).send('Usuário não encontrado');
    res.render('usuarios/form', { u, perfis: PERFIS, erro: null });
  },

  async atualizar(req, res) {
    const u = await Usuario.findByPk(req.params.id);
    if (!u) return res.status(404).send('Usuário não encontrado');
    try {
      const { nome, email, senha, perfil } = req.body;
      u.nome = nome;
      u.email = email;
      u.perfil = perfil;
      if (senha) u.senha = await bcrypt.hash(senha, 10); // vazio = mantém a senha atual
      await u.save();
      res.redirect('/usuarios');
    } catch (e) {
      res.status(400).render('usuarios/form', {
        u, perfis: PERFIS, erro: 'E-mail já cadastrado ou dados inválidos',
      });
    }
  },

  async excluir(req, res) {
    if (Number(req.params.id) === req.session.usuario.id) {
      return res.status(400).send('Você não pode excluir a si mesmo');
    }
    await Usuario.destroy({ where: { id: req.params.id } });
    res.redirect('/usuarios');
  },
};