const express = require('express');
const router = express.Router();

const {
  login,
  listarUsuarios,
  obterUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  excluirUsuario
} = require('../controllers/usuarioController');

const authenticateToken = require('../middleware/auth');
const validateDto = require('../middleware/validateDto');
const { usuarioSchema } = require('../dtos/usuarioDTO');

router.post('/login', login);

router.get('/usuarios', authenticateToken, listarUsuarios);
router.get('/usuarios/:id', authenticateToken, obterUsuarioPorId);
router.post('/usuarios', authenticateToken, validateDto(usuarioSchema), criarUsuario);
router.put('/usuarios/:id', authenticateToken, validateDto(usuarioSchema), atualizarUsuario);
router.delete('/usuarios/:id', authenticateToken, excluirUsuario);

module.exports = router;
