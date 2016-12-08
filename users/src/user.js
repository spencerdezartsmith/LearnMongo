const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post');

const UserSchema = new Schema({
  name: {
    type: String,
    // Validations
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  postCount: Number,
  posts: [PostSchema]
});



// Create the model called 'user' with the schema from above
// We can now refer to the User variable as the 'class' of users
const User = mongoose.model('user', UserSchema);

// Export the User class
module.exports = User;
