const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe '})
    joe.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation
    // .find({}) returns the entire collection
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  }

  it('instance type using set and save', (done) => {
    // incremental update
    joe.set('name', 'Alex')
    assertName(joe.save(), done)
  });

  it('a model instance can update', (done) => {
    // bulk update using an object
    assertName(joe.update({ name: 'Alex' }), done)
  });
});
