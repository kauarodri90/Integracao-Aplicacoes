const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authenticateToken = require('../middleware/auth');

router.post('/login', usuarioController.login);
router.get('/usuarios', usuarioController.listarUsuarios);
router.get('/usuarios/:id', usuarioController.obterUsuarioPorId);
router.post('/usuarios', usuarioController.criarUsuario);
router.put('/usuarios/:id', usuarioController.atualizarUsuario);
router.delete('/usuarios/:id', usuarioController.excluirUsuario);

module.exports = router;