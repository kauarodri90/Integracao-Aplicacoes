const Address = require('../models/Address');
const User = require('../models/User');

let addresses = [];
let currentId = 1;

const createAddress = (req, res) => {
  const { userId, cep, rua, numero, bairro, complemento, cidade, estado } = req.body;
  const user = users.find(u => u.id === userId);
  if (user) {
    const address = new Address(currentId++, cep, rua, numero, bairro, complemento, cidade, estado);
    addresses.push(address);
    user.addAddress(address);
    res.status(201).json(address);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
};

const getAddress = (req, res) => {
  const addressId = parseInt(req.params.id);
  const address = addresses.find(a => a.id === addressId);
  if (address) {
    res.json(address);
  } else {
    res.status(404).json({ message: 'Endereço não encontrado' });
  }
};

module.exports = {
  createAddress,
  getAddress
};