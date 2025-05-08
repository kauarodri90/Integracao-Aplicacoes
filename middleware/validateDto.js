const validateDto = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    next();
  } catch (error) {
    res.status(400).json({
      mensagem: 'Erro de validação',
      erros: error.errors,
    });
  }
};

module.exports = validateDto;
