const yup = require('yup');

const usuarioSchema = yup.object().shape({
  nome: yup.string().required('O nome é obrigatório'),
  sobrenome: yup.string().required('O sobrenome é obrigatório'),
  email: yup.string().email('E-mail inválido').required('O e-mail é obrigatório'),
  senha: yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('A senha é obrigatória'),
});

module.exports = { usuarioSchema };