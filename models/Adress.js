class Address {
    constructor(id, cep, rua, numero, bairro, complemento, cidade, estado) {
      this.id = id;
      this.cep = cep;
      this.rua = rua;
      this.numero = numero;
      this.bairro = bairro;
      this.complemento = complemento;
      this.cidade = cidade;
      this.estado = estado;
    }
  }
  
  module.exports = Address;