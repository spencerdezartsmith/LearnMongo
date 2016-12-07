const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  postCount: Number
});

// Create the model called 'user' with the schema from above
// We can now refer to the User variable as the 'class' of users
const User = mongoose.model('user', UserSchema);

// Export the User class
module.exports = User;
