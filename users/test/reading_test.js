const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  // Declare variable ahead of time
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save()
      .then(() => { done(); })
  });

  it('finds all users with the name of joe', (done) => {
    User.find({ name: 'Joe' })
      .then((users) => {
        console.log(users);
        done();
      });
  });
});
