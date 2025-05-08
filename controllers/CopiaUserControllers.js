let users = [
    { id: 1, name: 'John Doe 1', email: 'john1@example.com' },
    { id: 2, name: 'Jane Doe 2', email: 'jane2@example.com' },
  ];
  
  // Função para retornar todos os usuários
  exports.getAllUsers = (req, res) => {
    res.json(users);
  };
  
  // Função para retornar um usuário por ID
  exports.getUserById = (req, res) => {
    const { id } = req.params; // api.gabriel.com/users/1
    const user = users.find(u => u.id == id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('Usuário não encontrado');
    }
  };
  
  // Função para criar um novo usuário
  exports.createUser = (req, res) => {
    const { name, email } = req.body;
    const newUser = { id: users.length + 1, name: name, email: email };
    users.push(newUser);
    res.status(201).json(newUser);
  };
  
  // Função para atualizar um usuário
  exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    let user = users.find(u => u.id == id);
    if (user) {
      user.name = name;
      user.email = email;
      res.status(201).json(user);
    } else {
      res.status(404).send('Usuário não encontrado');
    }
  };
  
  // Função para deletar um usuário
  exports.deleteUser = (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex(u => u.id == id);
    if (userIndex >= 0) {
      users.splice(userIndex, 1);
      res.status(200).send();
    } else {
      res.status(404).send('Usuário não encontrado');
    }
  };