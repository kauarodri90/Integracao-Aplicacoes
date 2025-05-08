require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/', usuarioRoutes);

/* ──────────  Middleware de autenticação JWT  ────────── */
function autenticarToken(req, res, next) {
  const authHeader = req.headers.authorization;      // mesmo que req.headers['authorization']
  const token = authHeader?.split(' ')[1];           // espera "Bearer <token>"

  if (!token) {
    return res.status(401).json({ mensagem: 'Token não fornecido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) {
      return res.status(403).json({ mensagem: 'Token inválido' });
    }
    req.usuario = usuario;                           // payload gravado no token
    next();
  });
}

/* ──────────  Rotas protegidas  ────────── */
app.get('/rota-protegida', autenticarToken, (req, res) => {
  res.json({ mensagem: 'Acesso autorizado!', usuario: req.usuario });
});

/* ──────────  Inicialização do servidor  ────────── */
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
