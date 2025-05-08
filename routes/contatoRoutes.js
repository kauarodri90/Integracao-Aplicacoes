const express = require('express');
const router = express.Router();

const {
  listarContatos,
  obterContatoPorId,
  criarContato,
  atualizarContato,
  excluirContato
} = require('../controllers/contatoController');

const authenticateToken = require('../middleware/auth');
const validateDto = require('../middleware/validateDto');
const { contatoSchema } = require('../dtos/contatoDTO');

router.get('/contatos', authenticateToken, listarContatos);
router.get('/contatos/:id', authenticateToken, obterContatoPorId);
router.post('/contatos', authenticateToken, validateDto(contatoSchema), criarContato);
router.put('/contatos/:id', authenticateToken, validateDto(contatoSchema), atualizarContato);
router.delete('/contatos/:id', authenticateToken, excluirContato);

module.exports = router;
