const sequelize = require('../../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
})

const Post = sequelize.define('post', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    created_at: {type: DataTypes.DATE}
})

const Post_content = sequelize.define('post_content', {
    post_id: {type: DataTypes.INTEGER, foreignKey: true},
    title: {type: DataTypes.STRING},
    text: {type: DataTypes.TEXT},
    image: {type: DataTypes.STRING}
})

const Comment = sequelize.define('comment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    post_id: {type: DataTypes.INTEGER, foreignKey: true},
    author_id: {type: DataTypes.INTEGER, foreignKey: true},
    text: {type: DataTypes.STRING}
})

const Like = sequelize.define('like', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    post_id: {type: DataTypes.INTEGER, foreignKey: true},
    author_id: {type: DataTypes.INTEGER, foreignKey: true}
})

const SliderImage = sequelize.define('sliderImage', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    img_url: {type: DataTypes.STRING}
})

const AuthorInfo = sequelize.define('authorInfo', {
    first_name: {type: DataTypes.STRING},
    last_name: {type: DataTypes.STRING},
    age: {type: DataTypes.INTEGER},
    description: {type: DataTypes.TEXT},
    photo: {type: DataTypes.STRING}
})

const AuthorContacts = sequelize.define('authorContact', {
    address: {type: DataTypes.STRING},
    phone_number: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    vk: {type: DataTypes.STRING},
    inst: {type: DataTypes.STRING},
    github: {type: DataTypes.STRING},
    facebook: {type: DataTypes.STRING}
})

// user-post
User.hasMany(Post)
Post.belongsTo(User)
// user-comment
User.hasMany(Comment)
Comment.belongsTo(User)
// user-like
User.hasMany(Like)
Like.belongsTo(User)

// post-comment
Post.hasMany(Comment)
Comment.belongsTo(Post)
// post-like
Post.hasMany(Like)
Like.belongsTo(Post)
// post-content
Post.hasOne(Post_content)
Post_content.belongsTo(Post)

module.exports = {
    User,
    Comment,
    Like,
    Post_content,
    Post,
    SliderImage,
    AuthorInfo,
    AuthorContacts
}
