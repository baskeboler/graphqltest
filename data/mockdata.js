const {House, User} = require('../models/models');
const faker = require('faker');
const _ = require('lodash');

faker.locale = 'es';

var users = {};

_.range(0, 100).map((i) => new User({
    id: faker.random.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    telephone: faker.phone.phoneNumber(),
    
})).forEach((u) => {
    var numHouses = _.random(1, 4, false);
    for (var i =0; i < numHouses; i++) {
        var house = generateHouse(u);
        u.addHouse(house);
    }    
    users[u.id] = u
});



function generateHouse(user) {
    var house = new House({
        id: faker.random.uuid(),
        address: faker.address.streetAddress(),
        telephone: faker.phone.phoneNumber(),
        rooms: _.random(1, 5, false),
        bathrooms: _.random(1, 5, false),
        user: user
    });
    return house;
}

module.exports = users;