const express = require('express');
const router = express.Router();
const authApi = require('../../controllers/api/authApiController');

router.post('/login', authApi.login);            // pública
router.use('/usuarios', require('./usuarios'));

// Yada: router.use('/livros', require('./livros')); etc.
// Felipetto: router.use('/emprestimos', require('./emprestimos'));

module.exports = router;