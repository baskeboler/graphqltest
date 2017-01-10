const _ = require('lodash');
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
  }
};

module.exports = controller;