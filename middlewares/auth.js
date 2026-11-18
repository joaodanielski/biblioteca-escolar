function autenticado(req, res, next) {
  if (req.session.usuario) return next();
  res.redirect('/login');
}

function permitir(...perfis) {
  return (req, res, next) => {
    if (!req.session.usuario) return res.redirect('/login');
    if (perfis.includes(req.session.usuario.perfil)) return next();
    res.status(403).send('Acesso negado (403)');
  };
}

module.exports = { autenticado, permitir };