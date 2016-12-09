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
  // eg of subdocuments
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

// Creating a virtual property
// .get is a getter
UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

UserSchema.pre('remove', function(next) {
  const BlogPost = mongoose.model('blogPost');
  // Go through all blog posts. If the id is in the array of the users blogposts, remove it.
  BlogPost.remove({ _id: { $in: this.blogPosts } })
    .then(() => next());
});

// Create the model called 'user' with the schema from above
// We can now refer to the User variable as the 'class' of users
const User = mongoose.model('user', UserSchema);

// Export the User class
module.exports = User;
