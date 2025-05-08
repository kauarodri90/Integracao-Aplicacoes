const User = require('../models/User');

let users = [];
let currentId = 1;

const createUser = (req, res) => {
  const { nome, sobrenome, dataNascimento } = req.body;
  const user = new User(currentId++, nome, sobrenome, dataNascimento);
  users.push(user);
  res.status(201).json(user);
};

const getUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
};

const getAllUsers = (req, res) => {
  res.json(users);
};

module.exports = {
  createUser,
  getUser,
  getAllUsers
};