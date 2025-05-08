const Contato = require('../models/Contato');
const Usuario = require('../models/Usuario');

// Lista todos os contatos
async function listarContatos(req, res) {
  try {
    const contatos = await Contato.findAll({ include: Usuario });
    res.status(200).json(contatos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar contatos' });
  }
}

// Obtém um contato por ID
async function obterContatoPorId(req, res) {
  const { id } = req.params;
  try {
    const contato = await Contato.findByPk(id, { include: Usuario });
    if (!contato) return res.status(404).json({ message: 'Contato não encontrado' });
    res.status(200).json(contato);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter contato' });
  }
}

// Cria um novo contato vinculado a um usuário
async function criarContato(req, res) {
  const { email, telefone, usuarioId } = req.body;
  try {
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado para vincular o contato' });

    const novoContato = await Contato.create({ email, telefone, usuarioId });
    res.status(201).json(novoContato);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar contato' });
  }
}

// Atualiza um contato existente
async function atualizarContato(req, res) {
  const { id } = req.params;
  const { email, telefone } = req.body;
  try {
    const [linhas] = await Contato.update(
      { email, telefone },
      { where: { id } }
    );
    if (linhas === 0) return res.status(404).json({ message: 'Contato não encontrado' });

    const contato = await Contato.findByPk(id);
    res.status(200).json(contato);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar contato' });
  }
}

// Exclui um contato
async function excluirContato(req, res) {
  const { id } = req.params;
  try {
    const linhas = await Contato.destroy({ where: { id } });
    if (linhas === 0) return res.status(404).json({ message: 'Contato não encontrado' });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir contato' });
  }
}

module.exports = {
  listarContatos,
  obterContatoPorId,
  criarContato,
  atualizarContato,
  excluirContato,
};
