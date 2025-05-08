const Usuario = require('./Usuario');
const Contato = require('./Contato');

Usuario.hasMany(Contato, {
  foreignKey: 'usuarioId',
  onDelete: 'CASCADE',
});

Contato.belongsTo(Usuario, {
  foreignKey: 'usuarioId',
});

module.exports = { Usuario, Contato };
