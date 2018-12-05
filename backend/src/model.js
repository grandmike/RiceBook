const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    id: String,
    author: String,
    title: String,
    time: String,
    img: String,
    article: String,
    comments: [{
        id: String,
        username: String,
        comment: String
    }]
});

const profileSchema = mongoose.Schema({
    id: { type: String, required: true, unique: true},
    username: String,
    email: String,
    zipcode: String,
    phone: String,
    birth: String,
    img: String,
    status: String
});

const followingSchema = mongoose.Schema({
    id: { type: String, required: true, unique: true},
    following:[]
});


const userSchema = mongoose.Schema({
    id: { type: String, required: true, unique: true},
    salt: String,
    password: String,
    linkstatus: String,
    fb_id: String,
});


exports.Profile = mongoose.model('Profile', profileSchema);
exports.Following = mongoose.model('Following', followingSchema);
exports.Article = mongoose.model('Article', articleSchema);
exports.User = mongoose.model('User', userSchema);