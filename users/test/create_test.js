// Bring in the assertion library which is part of mocha
const assert = require('assert');
const User = require('../src/user');

// Mocha testing structure
describe('Creating records', () => {
  it('saves a user', (done) => {
    const joe = new User({ name: 'Joe' });

    joe.save()
      .then(() => {
        // Has joe been saved successfully?
        assert(!joe.isNew);
        done();
      })
  });
});
