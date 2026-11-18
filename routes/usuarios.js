const express = require('express');
const router = express.Router();
const { autenticado, permitir } = require('../middlewares/auth');
const c = require('../controllers/usuarioController');

// todas as rotas deste arquivo: só admin
router.use(autenticado, permitir('admin'));

router.get('/', c.listar);
router.get('/novo', c.formNovo);
router.post('/', c.criar);
router.get('/:id/editar', c.formEditar);
router.put('/:id', c.atualizar);
router.delete('/:id', c.excluir);

module.exports = router;