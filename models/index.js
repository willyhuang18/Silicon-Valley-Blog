const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

//post belong to user
Post.belongsTo(User, {
    foreignKey: 'user_id'
})

//post has many comment
Post.hasMany(Comment, {
    foreignKey: 'post_id'
})

//user has many post
User.hasMany(Post, {
    foreignKey: 'user_id'
})

//user has many comment 
User.hasMany(Comment, {
    foreignKey:'user_id'
})