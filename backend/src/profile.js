const Profile = require('./model').Profile;

const profile = [
    {
        "_id": {
            "$oid": "5be506a7c020f06ea94bc109"
        },
        "id": "qs8",
        "username": "gm1",
        "email": "sunqch3@gmail.com",
        "zipcode": "12333",
        "phone": "123-123-1234",
        "birth": "2018-11-01",
        "img": "/assets/1.png",
        "status": "I'm new here",
        "__v": 0
    },
    {
        "_id": {
            "$oid": "5be50bbd2753c86f8c3847fc"
        },
        "id": "qs9",
        "username": "gm2",
        "email": "sunqch3@gmail.com",
        "zipcode": "12333",
        "phone": "123-123-1234",
        "birth": "2018-11-01",
        "img": "/assets/1.png",
        "status": "I'm new here",
        "__v": 0
    }
];

function getHeadlines(req, res) {
    let re = [];
    //console.log('param', req.url);
    if (req.params.users == 'netid') {
        const s = req.url.split('?')[1].split('&');
        for (let i = 0; i < s.length; i++) {
            const id = s[i].split('=')[1];
            //console.log('id' + id);
            Profile.findOne({id:id})
                .then((data)=>{
                    //console.log('status ' + data.status);
                    re.push({id:id, headline:data.status});
                    if (i == s.length-1) {
                        res.send({result:"success", headlines:re});
                    }
                })
                .catch(err=> {
                    res.status(404).send({result:"failure"});
                });
        }

    } else {
        res.sendStatus(400);
    }
}

function updateHeadline(req, res) {
    const payload = req.body.status;
    //console.log('hehe' + JSON.stringify(req.body));
    Profile.findOneAndUpdate({id: req.body.id}, {status: payload})
        .then(response=>{
            res.status(200).send({result:"success", status:payload});
        })
        .catch(err=>{
            res.status(200).send({result:"success", status:err});
        });
}

function updateEmail(req, res) {
    const id = req.body.id;
    const email = req.body.email;
    //console.log(req.body);
    Profile.findOneAndUpdate({id:id}, {$set: {email: email}})
        .then((data)=>{
            res.send({result:"success", emails:email});
        })
        .catch(err=> {
            res.status(404).send({result:"failure"});
        });
}

function getZipcode(req, res) {
    const id = req.params.user;
    Profile.findOne({id:id})
        .then((data)=>{
            res.send({result:"success", zipcode:data.zipcode});
        })
        .catch(err=> {
            res.status(404).send({result:"failure"});
        });
}

function updateZipcode(req, res) {
    const id = req.body.id;
    const zipcode = req.body.zipcode;
    //console.log(req.body);
    Profile.findOneAndUpdate({id:id}, {$set: {zipcode: zipcode}})
        .then((data)=>{
            res.send({result:"success", zipcode:zipcode});
        })
        .catch(err=> {
            res.status(404).send({result:"failure"});
        });
}

function getDob(req, res) {
    const id = req.params.user;
    Profile.findOne({id:id})
        .then((data)=>{
            res.send({result:"success", dob:data.dob});
        })
        .catch(err=> {
            res.status(404).send({result:"failure"});
        });
}

function getAvatars(req, res) {
    let re = [];
    const s = req.url.split('&');

    for (let i = 0; i < s.length; i++) {
        let id = s[i].split('=')[1];
        Profile.findOne({id:id})
            .then((data)=>{
                re.push({id:id, avatar:data.avatar});
            })
            .catch(err=> {
                re.push({id:id, avatar:"assets/1.png"});
            });
    }

    res.send({result:"success", avatars: re});
}

function updateAvatar(req, res) {
    const id = req.body.id;
    const img = req.body.img;
    //console.log('\n\nupload' + req.body);
    Profile.findOneAndUpdate({id:id}, {$set: {img: img}})
        .then((data)=>{
            res.send({result:"success", img:img});
        })
        .catch(err=> {
            res.status(404).send({result:"failure"});
        });
}

function getEmail(req, res) {
    const id = req.params.user;
    Profile.findOne({id:id})
        .then((data)=>{

            res.send({result:"success", email:data.email});
        })
        .catch(err=> {
            res.status(404).send({result:"failure"});
        });
}


function getProfile(req, res) {
    const id = req.params.id;
    //console.log(id);
    Profile.findOne({id:id})
        .then((data)=>{
            res.send({result:"success", profile:data});
        })
        .catch(err=> {
            res.status(404).send({result:"failure"});
        });
}



exports.getHeadlines = getHeadlines;
exports.updateHeadline = updateHeadline;
exports.getEmail = getEmail;
exports.updateEmail = updateEmail;
exports.getZipcode = getZipcode;
exports.updateZipcode = updateZipcode;
exports.getDob = getDob;
exports.getAvatars  = getAvatars;
exports.updateAvatar = updateAvatar;
exports.getProfile = getProfile;

