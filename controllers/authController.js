const bcrypt = require('bcrypt');
const { Usuario } = require('../models');

module.exports = {
  formLogin(req, res) {
    res.render('login', { erro: null });
  },

  async login(req, res) {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      return res.status(401).render('login', { erro: 'E-mail ou senha inválidos' });
    }

    req.session.usuario = {
      id: usuario.id,
      nome: usuario.nome,
      perfil: usuario.perfil,
    };
    res.redirect('/');
  },

  logout(req, res) {
    req.session.destroy(() => res.redirect('/login'));
  },

  formCadastro(req, res) {
    res.render('cadastro', { erro: null });
  },

  async cadastro(req, res) {
    const { nome, email, senha } = req.body;
    try {
      const senhaHash = await bcrypt.hash(senha, 10);
      await Usuario.create({ nome, email, senha: senhaHash, perfil: 'aluno' });
      res.redirect('/login');
    } catch (e) {
      res.status(400).render('cadastro', { erro: 'E-mail já cadastrado ou dados inválidos' });
    }
  },
};