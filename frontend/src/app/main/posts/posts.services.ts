import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HttpService} from '../../http.service';
import {text} from '@angular/core/src/render3/instructions';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
    private  posts = [];
    private  callback;
    constructor(private http: HttpClient, private httpService: HttpService) { }


    setCurPosts( posts ) {
        this.posts = posts;
        this.callback(posts);
    }
    setCallBack(callback) {
      this.callback = callback;
    }


    getPostsUid(netid) {
      return this.httpService.dogetPostsUid(netid).toPromise().then((data) => {
        //console.log(data);
        return Promise.resolve(data);
      })
        .catch((err) => {
          return Promise.resolve(err);
        });
    }

    doSearch(keyword: string, postsCopy) {
      let posts = [];

        //console.log(postsCopy.length);
        if (keyword === null || keyword === '') {
            posts = postsCopy;
        } else {

            posts = postsCopy.filter(post => post.id.indexOf(keyword) !== -1
                || post.article.indexOf(keyword) !== -1);
        }
        return posts;
    }

    addPost(post) {
      return this.httpService.doAddaPost(post).toPromise().then((data) => {
        return Promise.resolve(data);
      })
        .catch((err) => {
          return Promise.resolve(err);
        });
    }

    updatePost(postId, post_text) {
      //console.log('pid ', postId);
      return this.httpService.doUpdatePost(postId, post_text, null).toPromise().then((data) => {
        return Promise.resolve(data);
      })
        .catch((err) => {
          return Promise.resolve(err);
        });
    }

    addComment(postId, comment_text, netid) {
      return this.httpService.doAddComment(postId, comment_text, "-1", netid).toPromise().then((data) => {
        return Promise.resolve(data);
      })
        .catch((err) => {
          return Promise.resolve(err);
        });
    }

    modifyComment(postId, comment_text, commentId) {
      return this.httpService.doModifyComment(postId, comment_text, commentId).toPromise().then((data)=>{
        return Promise.resolve(data);
      })
        .catch((err) => {
          return Promise.resolve(err);
        });
    }

}
