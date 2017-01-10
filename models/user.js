const _ = require('lodash');

module.exports = class User {
    constructor({id, name, email, telephone, houses}) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.telephone = telephone;
        this._houses = houses || {};
    }

    addHouse(house) {
        this._houses[house.id] = house;
    }

    houses() {
        return _.values(this._houses);
    }
}