const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
  it('requires a user name', () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    // Above is the same as below using ES6
    // const message = validationResult.errors.name.message;
    assert(message === 'Name is required.')
  });

  it('requires the name to have more than 2 characters', () => {
    const user = new User({ name: 'Al' });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === 'Name must be longer than 2 characters.')
  })

  it('doesn\'t allow invalid records to be saved', (done) => {
    const user = new User({ name: 'Al' })
    user.save()
      .catch((validationResult) => {
        const { message } = validationResult.errors.name;
        assert(message === 'Name must be longer than 2 characters.')
        done();
      });
  });
});
