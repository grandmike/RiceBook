import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Profile} from './Profile';
import {Following} from './Following';
import {Posts} from './Posts';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}
  //private Root = 'http://localhost:3000';
  private Root = 'https://qs8-final-backend.herokuapp.com';
  dogetPostsUid(netid) {
    const params = 'id=' + netid;
    //console.log('req params' + params);
    return this.http.get<{articles: Posts[], result: string}>(this.Root + '/articles/netid?' + params, {withCredentials: true});
  }

  dogetPostsAid(ariticleid) {
    const params = 'id=' + ariticleid;
    //console.log('req params' + params);
    return this.http.get<{articles: Posts[], result: string}>(this.Root + '/articles/articleid?' + params, {withCredentials: true});
  }

  doAddaPost(post: Posts) {
    return this.http.post<{article: Posts, result: string}>(this.Root + '/article', {article: post}, {withCredentials: true});
  }

  doLogin(netid, password) {
    return this.http.post<{id: string, result: string}>(this.Root + '/login', {'id': netid, 'password': password}, {withCredentials: true});
  }

  doLogout() {
    return this.http.put<{result: string}>(this.Root +'/logout', {}, {withCredentials: true});
  }

  doRegistration(profile: Profile) {
    return this.http.post<{id: string, result: string}>(this.Root + '/register', profile);
  }

  doGetProfile(netid) {
    return this.http.get<{profile: Profile, result: string}>(this.Root + '/Profile/' + netid, {withCredentials: true});
  }

  doUpdateHeadline(netid, status) {
    return this.http.put<{status: string, result: string}>(this.Root + '/headline', {id:netid, status:status}, {withCredentials: true});
  }

  doGetFollowing(netid) {
    return this.http.get<{following: Following, result: string}>(this.Root + '/following/' + netid, {withCredentials: true});
  }

  doUpdateFollowing(netid, newfollowing) {
    return this.http.put<{result: string }>(this.Root + '/following', {id: netid, following: newfollowing}, {withCredentials: true});
  }

  doDeleteFollowing(netid, defollowing) {
    return this.http.request('delete', this.Root + '/following', { body: {id: netid, following: defollowing}, withCredentials: true} );
  }

  doUpdateZipcode(netid, zipcode) {
    return this.http.put<{result: string, zipcode: string }>(this.Root + '/zipcode', {id: netid, zipcode: zipcode}, {withCredentials: true});
  }

  doUpdatePassowrd(netid, password) {
    return this.http.put<{result: string, id: string}>(this.Root + '/password', {id: netid, password: password}, {withCredentials: true});
  }

  doUpdateEmail(netid, email) {
    return this.http.put<{result: string, email: string }>(this.Root + '/email', {id: netid, email: email}, {withCredentials: true});
  }

  doUpdatePost(postId, text, commentId) {
    return this.http.put<{result: string}>(this.Root + '/article/' + postId, {text: text, commentId: commentId},{withCredentials: true});
  }

  doAddComment(postId, text, commentId, netid) {
    return this.http.put<{result: string, articles: Posts}>(this.Root + '/article/' + postId,
      {text: text, commentId: commentId, id: netid},{withCredentials: true});
  }

  doModifyComment(postId, text, commentId) {
    return this.http.put<{result: string, articles: Posts}>(this.Root + '/article/' + postId,
      {text: text, commentId: commentId},{withCredentials: true});
  }


  doFBLogin() {
    window.location.href = this.Root + '/facebook';
  }

  doGetCurId() {
    return this.http.get<{result:string, id:string}>(this.Root + '/curId', {withCredentials: true});
  }

  douploadImage(fd: FormData){
    return this.http.put(this.Root + '/uploadImage', fd, {withCredentials: true});
  }

  douploadAvatar(fd: FormData){
    return this.http.put(this.Root + '/uploadAvatar', fd, {withCredentials: true});
  }

  doUpdateAvatar(netid, img) {
    //console.log({id: netid, img: img});
    return this.http.put<{result:string, img:string}>(this.Root + '/avatar', {id: netid, img: img}, {withCredentials: true});
  }

  doGetUser(netid) {
    return this.http.get<{result: string, user}>(this.Root + '/user/' + netid, {withCredentials: true});
  }

  doUpdateUser(netid, linkstatus, fb_id) {
    return this.http.put<{result: string}>(this.Root + '/user', {id: netid, linkstatus: linkstatus, fb_id: fb_id}, {withCredentials: true});
  }

  doLinkAccount(fb_id, id, password) {
    return this.http.put<{result: string}>(this.Root + '/linkaccount', {fb_id: fb_id, id: id, password: password}, {withCredentials: true});
  }
}
