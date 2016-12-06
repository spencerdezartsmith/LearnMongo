// All code needed to set up our testing environment
const mongoose = require('mongoose');

// Connect to the database. It will create if the db doesn't exist
mongoose.connect('mongodb://localhost/users_test');
// Event handlers for the connection
mongoose.connection
  .once('open', () => {
    console.log('Good to go!')
  })
  .on('error', (error) => {
    console.warn('Warning', error)
  });

// testing
