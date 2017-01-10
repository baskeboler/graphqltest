const {House, User, Address} = require('../models/models');
const faker = require('faker');
const _ = require('lodash');

faker.locale = 'es_MX';

var users = {};

_.range(0, 100).map((i) => {
    var card = faker.helpers.createCard();
    return new User({
        id: faker.random.uuid(),
        name: card.name,
        email: card.email,
        telephone: card.phone,

    });
}).forEach((u) => {
    var numHouses = _.random(1, 4, false);
    for (var i = 0; i < numHouses; i++) {
        var house = generateHouse(u);
        u.addHouse(house);
    }
    users[u.id] = u
});



function generateHouse(user) {
    var card = faker.helpers.createCard();
    var address = new Address({
        streetA: card.address.streetA,
        streetB: card.address.streetB,
        city: card.address.city,
        state: card.address.state,
        zip: card.address.zipcode,
        country: card.address.country
    });
    var house = new House({
        id: faker.random.uuid(),
        address: address,
        telephone: card.phone,
        rooms: _.random(1, 5, false),
        bathrooms: _.random(1, 5, false),
        user: user
    });
    return house;
}

module.exports = users;