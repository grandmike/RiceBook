import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {PostsService} from '../posts/posts.services';
import {HttpService} from '../../http.service';

@Injectable({
  providedIn: 'root'
})
export class FollowingService {

  constructor(private http: HttpClient, private postsService: PostsService, private httpService: HttpService) { }

    updatePost(curId, curFollowingId) {
      const posts = [];
      let ids = [];
      ids.push({id:curId});
      for (let i = 0; i < curFollowingId.length; i++) {
        ids.push(curFollowingId[i]);
      }
      for (let i = 0; i < ids.length; i++) {
        const p = this.postsService.getPostsUid(ids[i].id);
        p.then(data => {
          if (data.result == "success") {
            //console.log('hehe' +data.articles.length);
            for (let j = 0; j < data.articles.length; j++) {
              posts.push(data.articles[j]);
            }
          }
          if (i == ids.length-  1) {
            this.postsService.setCurPosts(posts);
          }
        });
      }
    }

    getfollowing(netid) {
      return this.httpService.doGetFollowing(netid).toPromise().then((data) => {
        //console.log(data);
        return Promise.resolve(data);
      })
        .catch((err) => {
          return Promise.resolve(err);
        });
    }

    addfollowing(netid, newfollowing) {
      return this.httpService.doUpdateFollowing(netid, newfollowing).toPromise().then((data)=>{
        //console.log(data);
        return Promise.resolve(data);
      })
        .catch((err) => {
          return Promise.resolve(err);
        });
    }

    deletefollowing(netid, defollowing) {
      return this.httpService.doDeleteFollowing(netid, defollowing).toPromise().then((data)=>{
        //console.log(data);
        return Promise.resolve(data);
      })
        .catch((err) => {
          return Promise.resolve(err);
        });
    }

  getProfile(netid) {
    return this.httpService.doGetProfile(netid).toPromise().then((data) => {
      //console.log(data);
      return Promise.resolve(data);
    })
      .catch((err) => {
        return Promise.resolve(err);
      });
  }


}
