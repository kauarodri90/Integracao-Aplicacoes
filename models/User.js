class User {
    constructor(id, nome, sobrenome, dataNascimento) {
      this.id = id;
      this.nome = nome;
      this.sobrenome = sobrenome;
      this.dataNascimento = dataNascimento;
      this.addresses = [];
    }
  
    addAddress(address) {
      this.addresses.push(address);
    }
  }
  
  module.exports = User;