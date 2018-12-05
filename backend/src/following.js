const Following = require('./model').Following;

function getFollowing(req, res) {
    const id = req.params.user;
    Following.findOne({id:id})
        .then(data=>{
            res.send({result:"success", following:data});
        }).catch(err=>{
        res.status(400).send({result:"failure"});
    });
}

function updateFollowing(req, res) {
    const id = req.body.id;
    const newfollowing = req.body.following;
    Following.findOne({id:newfollowing})
        .then(newf=>{
            if (!newf) {
                //console.log(newf);
                res.status(200).send({result: "The new added user not exist in the DB"});
                return;
            }

            Following.findOne({id:id})
                .then(f=>{
                    //console.log(JSON.stringify(f));
                    f.following.push({id:newfollowing});

                    Following.findOneAndUpdate({id:id}, {following: f.following})
                        .then(newf => {
                            res.send({result:"success"});
                        });
                });
        }).catch(err=> {
        res.status(400).send({result: "failure"});
    });

    //res.send('not found');
}

function delFollowing(req, res) {
    const id = req.body.id;
    const defollowing = req.body.following;
    //console.log('def ' + defollowing);
    Following.findOne({id:id})
        .then(f=>{
            for (let i = 0; i < f.following.length; i++) {
                //console.log(i + ' ' + f.following[i]);
                if (f.following[i].id == defollowing) {
                    //console.log("delete " + defollowing);
                    f.following.splice(i,1);
                    break;
                }
            }
            Following.findOneAndUpdate({id:id}, {following: f.following})
                .then(newf => {
                    res.send({result:"success"});
                });
        });
}


exports.getFollowing = getFollowing;
exports.updateFollowing = updateFollowing;
exports.delFollowing = delFollowing;

