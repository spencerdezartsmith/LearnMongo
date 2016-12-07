const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });

    joe.save()
      .then(() => done());
  });

  it('model instance remove', (done) => {
    joe.remove()
    // chain in the events to roll off of each other
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      })
  });

  it('class method remove', (done) => {
    User.remove({ name: 'Joe' })
      .then(() => User.find({ name: 'Joe' }))
      .then((users) => {
        assert(users.length === 0)
        done();
      })
  });

  it('class method findAndRemove', (done) => {
    User.findOneAndRemove({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      })
  });

  it('class method findByIdAndRemove', (done) => {
    User.findByIdAndRemove(joe.id)
    .then(() => User.findOne({ _id: joe.id }))
    .then((user) => {
      assert(user === null);
      done();
    })
  });
});
