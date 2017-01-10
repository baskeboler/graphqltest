const _ = require('lodash');
const {Address,House,User} = require('../models/models');
var mockData = require('../data/mockdata');
var debug = require('debug')('graphqltest:graphql-controller');
var controller = {
  hello: () => {
      debug('running hello()');
    return 'Hello world!';
  },
  allUsers: () => {
      debug('running allUsers');
    return _.values(mockData);
  },
  user: function ({id}) {
      debug(`running user(${id})`);
    return mockData[id];
  },
  allHouses: () => {
      debug('running allHouses');
    return _.flatMap(_.values(mockData).map((u) => u.houses()));
  },
  house: function({id}) {
      debug(`running house(${id})`);
      return _.find(this.allHouses(), (h) => h.id == id);
  },
  createUser: function({input}) {
      var id = _.uniqueId('user_');
      var user = new User({
          id: id,
          name: input.name,
          telephone: input.telephone,
          email: input.email
      });
      mockData[user.id] = user;
      return user;
  },
  createHouse: function({input}) {
      debug('in createHouse');
      var id = _.uniqueId('house_');
      var address = new Address({
          streetA: input.streetA,
          streetB: input.streetB,
          city: input.city,
          country: input.country,
          state: input.state,
          zip: input.zip
      });
      var user = this.user({
          id: input.userId
      });
      var house = new House({
          id: id,
          address: address,
          telephone: input.telephone,
          rooms: input.rooms,
          bathrooms: input.bathrooms,
          user: user
      });
      user.addHouse(house);
      return house;
  }
};

module.exports = controller;