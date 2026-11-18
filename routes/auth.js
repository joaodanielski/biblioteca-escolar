const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

router.get('/login', auth.formLogin);
router.post('/login', auth.login);
router.get('/logout', auth.logout);
router.get('/cadastro', auth.formCadastro);
router.post('/cadastro', auth.cadastro);

module.exports = router;