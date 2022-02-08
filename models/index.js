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
