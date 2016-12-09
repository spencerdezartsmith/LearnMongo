const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: String,
  author: {
    // This is an association between the comment and the author of the comment
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;
