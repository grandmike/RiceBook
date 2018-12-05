const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const FacebookStrategy = require('passport-facebook');
const passport = require('passport');
const isLoggedIn = require('./src/auth').isLoggedIn;
const auth = require('./src/auth');
const articles = require('./src/articles');
const following = require('./src/following');
const profile = require('./src/profile');
const session = require('express-session')
const uploadImage = require('./src/uploadCloudinary');

//require('./src/uploadCloudinary').setup(app);
//mongodb://<dbuser>:<dbpassword>@ds153093.mlab.com:53093/qs8_531_backend
//user: qs8
//password: qR7JnhzkuCqTG8K
app.use(session({secret: 'thisIsMySecretMessageHowWillYouGuessIt'}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Expose-Headers', 'Location, X-Session-Id');
    next();
});

mongoose.connect('mongodb://qs8:qR7JnhzkuCqTG8K@ds153093.mlab.com:53093/qs8_531_backend')
    .then(()=> {
        console.log('Connected to my DB!');
    })
    .catch(()=> {
        console.log('Connection failed!');
    });

const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log('Server started on port ' + port);
});
app.use(cookieParser());
app.use(bodyParser.json());

app.post('/login', auth.login);
app.put('/logout', isLoggedIn, auth.logout);
app.post('/register', auth.register);
app.put('/password', isLoggedIn, auth.updatePassord);

app.get('/articles/:id?', isLoggedIn, articles.getArticles);
app.put('/article/:id', isLoggedIn, articles.updateaArticle);
app.post('/article',  isLoggedIn, articles.addArticle);

app.get('/following/:user?',  isLoggedIn, following.getFollowing);
app.put('/following',  isLoggedIn, following.updateFollowing);
app.delete('/following',  isLoggedIn, following.delFollowing);


app.get('/headlines/:users?', isLoggedIn, profile.getHeadlines);
app.put('/headline', isLoggedIn, profile.updateHeadline);
app.get('/email/:user?', isLoggedIn, profile.getEmail);
app.put('/email', isLoggedIn, profile.updateEmail);
app.get('/zipcode/:user?', isLoggedIn, profile.getZipcode);
app.put('/zipcode', isLoggedIn, profile.updateZipcode);
app.get('/dob/:user?', isLoggedIn, profile.getDob);
app.get('/avatars/:user?', isLoggedIn, profile.getAvatars);
app.put('/avatar', isLoggedIn, profile.updateAvatar);
app.get('/profile/:id', isLoggedIn, profile.getProfile);
app.get('/curId', isLoggedIn, auth.getCurId);
app.put('/uploadImage', auth.isLoggedIn, uploadImage('article'), uploadRes);
app.put('/uploadAvatar', auth.isLoggedIn, uploadImage('avatar'), uploadRes);
app.get('/user/:id', auth.isLoggedIn, auth.getUser);
app.put('/user', auth.isLoggedIn, auth.updateUser);
app.put('/linkaccount', auth.isLoggedIn, auth.linkaccount);
//app.get('/unlinkAccount', auth.isLoggedIn, auth.unlinkAccount);

function uploadRes(req, res){
    if(req.fileurl){
        res.statusCode = 200;
        //console.log('imgsrc '+ req.fileurl);
        res.json({img: req.fileurl});
    }else{
        res.json({img: ''});
    }
}

app.use(passport.initialize());
app.use(passport.session());


const users = {};
const facebookConfig = {
    clientID: '2728886504002526',
    clientSecret: '446ca6204d848721f5c675e0d1fb2466',
    callbackURL: 'https://qs8-final-backend.herokuapp.com/facebook/callback',
    //callbackURL: 'http://localhost:3000/facebook/callback',
    profileFields: ['emails'],
    _enableProof: true,
};

passport.serializeUser(function (user, done) {
    users[user.id] = user;
    done(null, user.id)
});

passport.deserializeUser(function (id, done) {
    var user = users[id];
    done(null, user)
});

passport.use(new FacebookStrategy(facebookConfig,
    function(token, refreshToken, profile, done) {
        done(null, profile);
    }
));
// app.use('/facebook', passport.initialize(), passport.authenticate('facebook', {session: false, scope: ['email']}));
// app.use('/facebook/callback', passport.initialize(),
//     passport.authenticate('facebook', {session: false, successRedirect: '/fb_login', failureRedirect: '/fb_fail'}));
//
// app.use('/fb_login', auth.fb_login);
// app.use('/fb_fail', auth.fb_fail);

app.use('/facebook', passport.initialize(), passport.authenticate('facebook', {session: false, scope: ['email']}));
app.use('/facebook/callback', passport.initialize(), auth.fb_login);

// app.use('/fb_login', auth.fb_login);
// app.use('/fb_fail', auth.fb_fail);

