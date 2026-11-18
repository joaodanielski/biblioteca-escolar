const express = require('express');
const router = express.Router();
const { autenticadoApi, permitirApi } = require('../../middlewares/apiAuth');
const c = require('../../controllers/api/usuarioApiController');

router.use(autenticadoApi, permitirApi('admin'));

router.get('/', c.listar);
router.get('/:id', c.buscar);
router.post('/', c.criar);
router.put('/:id', c.atualizar);
router.delete('/:id', c.excluir);

module.exports = router;