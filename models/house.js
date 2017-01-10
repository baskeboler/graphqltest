
module.exports = class House {
  constructor({id, address, telephone, rooms, bathrooms, user}){
    this.id = id;
    this.address = address;
    this.telephone = telephone;
    this.rooms = rooms;
    this.bathrooms = bathrooms;
    this.user = user;
  }
}

