// All code needed to set up our testing environment
const mongoose = require('mongoose');

// Referencing the ES6 implementation of promises
mongoose.Promise = global.Promise;

// We only want to connect to mongo once
before((done) => {
  // Connect to the database. It will create if the db doesn't exist
  mongoose.connect('mongodb://localhost/users_test');
  // Event handlers for the connection
  mongoose.connection
  // Call 'done' once connected in order to run tests
    .once('open', () => { done(); })
    .on('error', (error) => {
      console.warn('Warning', error)
    });
})

// Add hook which is a function that will be executed before each test
beforeEach((done) => {
  // mongo changes collection names to lowercase
  const { users, comments, blogposts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});
