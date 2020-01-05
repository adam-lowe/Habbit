const User = require('./user');

let NEXT_UID = 2;
const USERS = [
  {
    id: 1,
    email: 'jhoffman@trilogyed.com',
    password: 'test'
  }
];

module.exports = {
  Users: {
    create: async function ({ email, password }) {
      const user = new User({
        id: NEXT_UID++,
        email,
        password
      });

      await user.save();
      return Promise.resolve(user);
    },

    findAll: function () {
      return Promise.resolve(USERS.map(u => new User(u)));
    },

    findOne: async function ({ where }) {
      let pred;
      if (where.hasOwnProperty('email')) {
        pred = { email: where.email} ;
      } else if (where.hasOwnProperty('id')) {
        pred = { _id:  where.id};
      }
      const user = await User.findOne(pred);
      if (!user) {
        return Promise.resolve(undefined);
      }

      return Promise.resolve(new User(user));
    }
  },

  Secrets: {
    findAll: function () {
      return Promise.resolve([
        {
          id: 1,
          message: 'The clock tolls twice at midnight on the next full moon'
        }
      ]);
    }
  }
}