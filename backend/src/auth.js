const Profile = require('./model').Profile;
const Article = require('./model').Article;
const User = require('./model').User;
const Following = require('./model').Following;
const md5 = require('md5');


var sessionUser = {};

function fb_login(req, res) {
    if(!req.isAuthenticated()){
        res.status(401).send({result: 'failure_login', data:"nima", user:req.user});
        return;
    }

    const fb_profile = req.user;
    //console.log('st1 success');
    const fb_id  = fb_profile.id + '@fb';
    //console.log('fb id ' + fb_id);
    const fb_email = fb_profile.emails ? fb_profile.emails[0].value :"";

    User.findOne({id: fb_id})
        .then((data) => {
        if(!data) {
            User.findOne({fb_id: fb_id})
                .then((data2) => {
                    if (!data2) {
                        const salt = "my_secret" + new Date().getTime();
                        const hash = md5(salt + 'facebook');
                        new User({
                            id: fb_id,
                            salt: salt,
                            password: hash
                        }).save((result) => {

                            new Profile({
                                id: fb_id,
                                email: fb_email,
                                zipcode: '77030',
                                phone: '000-000-0000',
                                birth: '',
                                img: 'assets/1.png',
                                status: 'I\'m from facebook!',

                            }).save((result) => {
                                new Following({
                                    id: fb_id,
                                    following: [],
                                }).save(() => {
                                    fb_cookie(fb_id, res);
                                });
                            });
                        });
                    } else {
                        fb_cookie(data2.id, res);
                    }
                });
        } else{
            fb_cookie(fb_id, res);
        }
    })
}

function fb_cookie(fb_id, res){

    User.findOne({id:fb_id})
        .then((user) => {

        const sessionKey = md5("my_secret" + new Date().getTime() + user.id);
        sessionUser[sessionKey] = user;
        res.statusCode = 200;
        res.cookie('cookieKey', sessionKey, {maxAge: 3600*1000, httpOnly: true});

        res.redirect('https://qs8-final-frontend.surge.sh/#/main');

        //res.redirect('http://localhost:4200/#/main');
    }).catch((err)=> {
        res.status(401).send({result: 'failure'});
    });
}

function fb_fail(req, res){
    res.redirect('https://qs8-final-frontend.surge.sh/');
    //res.redirect('http://localhost:4200/');
}


function login(req, res) {
    //console.log('login');
    //console.log(req.body);
    const s = req.body.id.split('@');
    let query;
    //for test
    if (s.length > 1) {
        query = {fb_id: req.body.id};
    } else {
        query = {id: req.body.id};
    }
    User.findOne(query)
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    id:req.body.id,
                    result:'netid not exists'
                });
            }
            const hashpassword = md5(user.salt + req.body.password);
            if (hashpassword != user.password) {
                return res.status(401).json({
                    id:user.id,
                    result:'wrong netid or password'
                });
            }

            const sessionKey = md5("my_secret" + new Date().getTime() + user.id);
            sessionUser[sessionKey] = user;
            //console.log('session key:' + sessionKey);
            res.cookie('cookieKey', sessionKey, {maxAge: 3600*1000, httpOnly: true});
            res.send({
                id:user.id,
                result: 'success'
            })
        });


}

function isLoggedIn(req, res, next) {
    const sid = req.cookies['cookieKey'];
    if (sid) {
        if (!sid || !sessionUser[sid]) {
            res.sendStatus(401);
        }

        next();
    } else {

        res.sendStatus(401);
    }
}

function getCurId(req, res) {
    const sid = req.cookies['cookieKey'];
    const id = sessionUser[sid].id;
    res.send({result:"success", id:id});
}

function logout(req, res) {
    const sid = req.cookies["cookieKey"];
    const id = sessionUser[sid].id;
    delete sessionUser[sid];
    res.clearCookie("cookieKey");
    res.statusCode = 200;
    res.send({id: id, result:"success"});

}

function register(req, res) {
    const payload = req.body;

    const salt = "my_secret" + new Date().getTime();
    const hash = md5(salt + payload.password);
    const newuser = new User({
        id: payload.id,
        salt: salt,
        password: hash
    });
    // fck prob
    User.find({id:payload.id})
        .then((data) => {
            if (data.length) {
                //console.log('hehe');
                //console.log(JSON.stringify(data));
                const re = {id: newuser.id, result: "failure"};
                res.statusCode = 400;
                res.send(JSON.stringify(re));
                return;
            } else {
                newuser.save()
                    .then(result=> {
                        const newprofile = new Profile({
                            id:payload.id,
                            username:payload.username,
                            email: payload.email,
                            zipcode: payload.zipcode,
                            phone: payload.phone,
                            birth: payload.birth,
                            img: payload.img,
                            status: payload.status,
                        });
                        //console.log('profile' + newprofile);
                        newprofile.save();
                        const newfollowing = new Following({
                            id: payload.id,
                            following: [],
                        });
                        newfollowing.save();
                        const re = {id: newuser.id, result:"success"};
                        res.send(JSON.stringify(re));
                    })
                    .catch(err=> {
                        const re = {id: newuser.id, result:"failure"};
                        res.statusCode = 400;
                        res.send(JSON.stringify(re));
                    })
            }
        });
}

function updatePassword(req, res) {
    const payload = req.body;
    const id = payload.id;
    const password = payload.password;
    const salt = "my_secret" + new Date().getTime();
    const hash = md5(salt + password);
    User.findOneAndUpdate({id:id}, {$set: {salt:salt, password:hash}})
        . then((data)=>{
        res.send({result:"success", id:id});
        })
        .catch(err=> {
            res.status(404).send({result:"failure"});
        });
}

function linkaccount(req, res) {
    const fb_id = req.body.fb_id;
    const id = req.body.id;
    const password = req.body.password;

    User.findOne({id: id}).then((user) => {
        if(user){
            if(user.password == md5(user.salt + password)){
                if (user.linkstatus != 'true') {
                    User.findOne({id: fb_id}).then((fbuser) => {

                        mergeTwo(user, fbuser, res)
                    })
                } else {
                    res.send({result: 'this user has been linked!'});
                }
            } else{
                res.send({result: 'id or password is not correct!'});
            }
        } else{
            res.send({result: 'No such user!'});
        }
    })
}

function mergeTwo(user, fbuser, res) {
    //console.log('start merge');
    //console.log(fbuser);
    Article.update({id:fbuser.id},{ $set: { id: user.id } }, { new: true, multi: true })
        .then((t)=> {

            Article.update({ 'comments.username': fbuser.id },
                { $set: { 'comments.$.username': user.id } }, { new: true, multi: true })
                .then((t2)=>{


                    Following.findOne({id: fbuser.id}).then((data) => {
                        if(data) {
                            const fbFollowings = data.following;
                            Following.findOne({id: user.id}).then((data2) => {
                                if (data2) {
                                    const normalFollowings = data2.following;
                                    let mergeFollowings = mergeArray(normalFollowings, fbFollowings);
                                    Following.findOneAndUpdate({id: user.id},
                                        {$set: {following: mergeFollowings}}, {new: true}).then((t3) => {
                                        User.findOneAndUpdate({id: user.id}, { linkstatus: 'true', fb_id: fbuser.id}, {new: true})
                                            .then((t4) => {
                                                User.deleteOne({id: fbuser.id}).then((t5)=>{
                                                    Profile.deleteOne({id: fbuser.id}).then((t6)=>{
                                                        Following.deleteOne({id: fbuser.id}).then((t7)=>{
                                                            res.send({result: 'success'});
                                                        });
                                                    });
                                                });

                                            });
                                    })
                                } else {
                                    res.send({result: 'not found'});
                                }
                            });
                        } else {
                            res.send({result: 'not found fb'});
                        }
                    });
                })
        });


}

function mergeArray(a, b) {
    let ans = [...a];
    for (let i = 0; i < b.length; i++) {
        if (b[i] in ans) continue;
        ans.push(b[i]);
    }
    return ans;

}

function getUser(req, res) {
    User.findOne({id:req.params.id})
        .then(user => {
            //console.log('find user', user);
            if (!user) {
                res.status(401).json({
                    result:'netid not exists'
                });
            }
           else {
                res.send({
                    user:user,
                    result:'success',
                });
            }

        });
}


function updateUser(req, res) {
    //console.log('unlink', req.body);
    //console.log(req.body.id);
    User.findOneAndUpdate({id:req.body.id}, {$set: {linkstatus: req.body.linkstatus, fb_id: req.body.fb_id}})
        .then(user => {
            res.send({result:"success"});
        });
}

exports.login = login;
exports.logout = logout;
exports.register = register;
exports.isLoggedIn = isLoggedIn;
exports.updatePassord = updatePassword;
exports.fb_login = fb_login;
exports.fb_fail = fb_fail;
exports.getCurId = getCurId;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.linkaccount = linkaccount;