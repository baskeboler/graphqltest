const _ = require('lodash');
const {Address,House,User, JobRequest, Worker, JobBooking} = require('../models/models');
var {users, workers, jobrequests} = require('../data/mockdata');
var debug = require('debug')('graphqltest:graphql-controller');
var controller = {
  hello: () => {
      debug('running hello()');
    return 'Hello world!';
  },
  allUsers: () => {
      debug('running allUsers');
    return _.values(users);
  },
  user: function ({id}) {
      debug(`running user(${id})`);
    return users[id];
  },
  allHouses: () => {
      debug('running allHouses');
    return _.flatMap(_.values(users).map((u) => u.houses()));
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
      users[user.id] = user;
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
  },
  allWorkers: () => {
      debug('getting all workers');
      return _.values(workers);
  },
  worker: function({id}) {
      debug(`get worker ${id}`);
      return workers[id];
  },
  allJobRequests: () => {
      debug('all job requests');
      return _.values(jobrequests);
  },
  openJobRequests: () => {
      debug('open job requests');
      return _.values(jobrequests).filter(r => r.open);
  },
  createJobRequest: function({input}) {
      var house = this.house({id: input.houseId});
      var date = Date.parse(input.date);
      var req = new JobRequest({
          id: _.uniqueId('jobrequest_'),
          house: house,
          date: date,
          numberOfHours: input.numberOfHours,
          open: true
      });
      jobrequests[req.id] = req;
      return req;
  },
  bookJob: function({input}) {
      var reqId = input.jobRequestId;
      var req = jobrequests[reqId];
      if (!req || !req.open) {
          throw Error("invalid req");
      }
      var worker = workers[input.workerId];
      if (!worker) {
          throw new Error("invalid worker")
      }
      req.open = false;
      var booking = new JobBooking({
          id: _.uniqueId('jobbooking_'),
          jobRequest: req,
          worker: worker
      });
      return booking;
  }
};

module.exports = controller;