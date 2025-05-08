const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Lista todos os usuários
async function listarUsuarios(req, res) {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar usuários' });
  }
}

// Obtém um usuário por ID
async function obterUsuarioPorId(req, res) {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter usuário' });
  }
}

// Cria um novo usuário
async function criarUsuario(req, res) {
  const { nome, sobrenome, email, senha } = req.body;
  try {
    const existente = await Usuario.findOne({ where: { email } });
    if (existente) return res.status(400).json({ message: 'E-mail já cadastrado' });

    const novoUsuario = await Usuario.create({ nome, sobrenome, email, senha });
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
}

// Atualiza dados de um usuário
async function atualizarUsuario(req, res) {
  const { id } = req.params;
  const { nome, sobrenome, email, senha } = req.body;
  try {
    const [linhas] = await Usuario.update(
      { nome, sobrenome, email, senha },
      { where: { id } }
    );
    if (linhas === 0) return res.status(404).json({ message: 'Usuário não encontrado' });

    const usuario = await Usuario.findByPk(id);
    res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar usuário' });
  }
}

// Remove um usuário
async function excluirUsuario(req, res) {
  const { id } = req.params;
  try {
    const linhas = await Usuario.destroy({ where: { id } });
    if (linhas === 0) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir usuário' });
  }
}

// Login de usuário
async function login(req, res) {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario || usuario.senha !== senha) {
      return res.status(401).json({ message: 'E-mail ou senha inválidos' });
    }

    const payload = { id: usuario.id, nome: usuario.nome };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao realizar login' });
  }
}

module.exports = {
  login,
  listarUsuarios,
  obterUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  excluirUsuario,
};
