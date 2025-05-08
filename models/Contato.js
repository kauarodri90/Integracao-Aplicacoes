const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Contato = sequelize.define('Contato', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'contatos',
  timestamps: false,
});

module.exports = Contato;
