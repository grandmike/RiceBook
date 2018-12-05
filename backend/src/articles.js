const Article = require('./model').Article;
const mongoose = require('mongoose');


function getArticles(req, res) {
    if (req.params.id == "netid") {
        const s = req.url.split('?')[1];
        const id = s.split('=')[1];
        //console.log(id);
        Article.find({id : id}).limit(10)
            .then(document=> {
                res.send({result:"success", articles:document});
            });

    } else if (req.params.id == "articleid") {
        const s = req.url.split('?')[1];
        let id = s.split('=')[1];
        id = mongoose.Types.ObjectId(id);
        //console.log(id);
        Article.find({_id : id}).limit(10)
            .then(document=> {
                res.send({result:"success", articles:document});
            });
    } else {
        Article.find().limit(10)
        .then(document=> {
                res.send({result:"success", articles:document});
        });

    }
}

function updateaArticle(req, res) {
    const payload = req.body;
    const articleid = req.params.id;
    //console.log('article id ', articleid);
    //console.log('payload', payload);
    //check the netid, the user have the article!
    if (payload.commentId == null) {
        Article.findOneAndUpdate({_id: articleid}, {$set: {article: payload.text}})
            .then((data)=>{
                //console.log('update article:' , data);
                res.send({result:"success", articles:data});
            })
            .catch(err=> {
                res.status(404).send({result:"failure"});
            });
    } else {
        if (payload.commentId == "-1") {
            Article.findOne({_id: articleid})
                .then((data)=>{
                    //console.log('all comments ', data.comments);
                    let newcoment = {id: data.comments.length+'', username: payload.id, comment: payload.text};
                    data.comments.push(newcoment);
                    //console.log(data);

                    Article.findOneAndUpdate({_id:articleid}, {$set: {comments: data.comments}})
                        .then((res)=>{
                            //console.log('success');
                            res.send({result:"success", articles:data});
                        })
                        .catch(err=> {
                            res.send({result:"success", articles:data});
                        });

                }).catch(err=> {
                res.status(404).send({result:"failure"});
                });
        } else {
            Article.findOneAndUpdate({_id:articleid, 'comments._id': payload.commentId},
                {'comments.$.comment':payload.text}, {upsert:true, new:true})
                .then((data)=>{
                    //console.log('new ar  ', data);
                    res.send({result:"success", articles:data})
                })
                .catch(err=> {
                    res.status(404).send({result:"failure"});
                });
        }
    }
}
//    id: String,
//     articleid: String,
//     author: String,
//     title: String,
//     time: String,
//     img: String,
//     article: String,
//     comment: String
function addArticle(req, res) {
    const newarticle = new Article({
        id:req.body.article.id,
        author: req.body.article.author,
        title:req.body.article.title,
        time: new Date().toLocaleString(),
        article:req.body.article.article,
        author:req.body.article.author,
        img: req.body.article.img,
        comments: req.body.article.comment
    });
    newarticle.save().then(document => {
        res.send({result:"success", article:newarticle});
    });

}

exports.getArticles = getArticles;
exports.updateaArticle = updateaArticle;
exports.addArticle = addArticle;
