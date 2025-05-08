const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/* ─────────  Handlers CRUD  ───────── */

async function listarUsuarios(req, res) {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar usuários' });
  }
}

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

async function criarUsuario(req, res) {
  const { nome, sobrenome, email, senha } = req.body;
  try {
    const novoUsuario = await Usuario.create({ nome, sobrenome, email, senha });
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
}

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

/* ─────────  Login (gera JWT)  ───────── */

function login(req, res) {
  const { username } = req.body;
  if (username !== 'admin') return res.status(401).json({ message: 'Usuário inválido' });

  const user = { name: username };
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
}

/* ─────────  Exporta tudo de uma vez  ───────── */

module.exports = {
  login,
  listarUsuarios,
  obterUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  excluirUsuario,
};
