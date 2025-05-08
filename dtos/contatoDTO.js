const yup = require('yup');

const contatoSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('O e-mail é obrigatório'),
  telefone: yup.string().required('O telefone é obrigatório'),
  usuarioId: yup.number().required('O ID do usuário é obrigatório'),
});

module.exports = { contatoSchema };
