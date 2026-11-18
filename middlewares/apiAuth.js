const jwt = require('jsonwebtoken');

function autenticadoApi(req, res, next) {
  const header = req.headers.authorization || '';
  const [tipo, token] = header.split(' ');

  if (tipo !== 'Bearer' || !token) {
    return res.status(401).json({ erro: 'Token não informado' });
  }

  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
}

function permitirApi(...perfis) {
  return (req, res, next) => {
    if (!req.usuario) return res.status(401).json({ erro: 'Não autenticado' });
    if (!perfis.includes(req.usuario.perfil)) {
      return res.status(403).json({ erro: 'Acesso negado' });
    }
    next();
  };
}

module.exports = { autenticadoApi, permitirApi };