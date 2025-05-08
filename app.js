require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const sequelize = require('./config/database');
require('./models/associations');

const usuarioRoutes = require('./routes/usuarioRoutes');
const contatoRoutes = require('./routes/contatoRoutes');

app.use(express.json());

app.use('/', usuarioRoutes);
app.use('/', contatoRoutes);

sequelize.sync()
  .then(() => {
    console.log('Banco sincronizado com sucesso');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao sincronizar banco de dados:', err);
  });
