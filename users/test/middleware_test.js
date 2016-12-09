const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
  let joe, blogPost;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is great', content: 'Learning is the best' });

    // User has many blog posts
    joe.blogPosts.push(blogPost);

    // You can pass Promise.all an array of promises.
    Promise.all([joe.save(), blogPost.save()])
      .then(() => done());
  });

  it('clean up users dangling blogposts on remove', (done) => {
    joe.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0);
        done();
      });
  })
});
