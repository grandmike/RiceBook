import {Component, OnInit} from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';
import {Router} from '@angular/router';
import {PostsService} from './posts.services';
import {Posts} from '../../Posts';
import {HttpService} from '../../http.service';

@Component({
  selector: 'app-main-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts = [];
  postsCopy = [];
  id;
  username;
  article;
  imagesrc;
  imagePreview: string;
  hint;
  posthint;
  isLoading = false;
  updatePost;
  _EditPostId;
  _CommentPostId;
  _CommentModifyId;
  updateArticleText;
  addCommentText;
  modifyCommentText;
  constructor(private postsService: PostsService, private router: Router, private httpService: HttpService) { }
  ngOnInit() {
    this.httpService.doGetCurId().toPromise()
      .then((data)=>{
        //console.log('fb data', data);
        localStorage.setItem('curId', data.id);
        this.id = data.id;
      });
    this.hint = document.getElementById('article_hint');
    this.username = localStorage.getItem('curUsername');
    this.imagesrc = null;
    this.imagePreview = null;
    this.isLoading = true;
    this._EditPostId = -1;
    this._CommentModifyId = -1;
    this.postsService.setCallBack((posts) => {
      this.postsCopy = posts;
      this.sortCurPosts();
      this.posts = this.postsCopy;
      this.isLoading = false;
    });

  }


  sortCurPosts() {
    //console.log("to sort");
    //console.log('the length' + this.postsCopy.length);
    for (let i = 0; i < this.postsCopy.length; i++) {
      for (let j = i+1; j < this.postsCopy.length; j++) {
        const d1 = new Date(this.postsCopy[i].time);
        const d2 = new Date(this.postsCopy[j].time);
        if (d1 < d2) {
          const t = this.postsCopy[i];
          this.postsCopy[i] = this.postsCopy[j];
          this.postsCopy[j] = t;
        }
      }
    }
    if (this.postsCopy.length >= 10) {
      this.postsCopy.slice(0, 9);
    }
  }

  onAddPost(form: NgForm) {
    if (!form.valid || this.article == null || this.article === '') {
      return;
    }
    this.isLoading = true;

    // const articleForm = new FormData();
    // articleForm.append('id', this.id);
    // articleForm.append('article', this.article);
    //articleForm.append('img', this.image);

    const post: Posts = {
      id: this.id,
      articleid: "useless",
      author: this.username,
      title: 'new article',
      time: new Date().toLocaleString(),
      img: this.imagesrc,
      article: this.article,
      comments: []
    };
    const p = this.postsService.addPost(post)
      .then((data)=>{
        if(data.result == "success") {
          //console.log('new ad article', data.article);
          //console.log(post);
          this.postsCopy.unshift(data.article);
          this.posts = this.postsCopy;
          this.article = '';

          this.sendHintMessage("Post success!", "green");
        }
        this.isLoading = false;
      });
    this.imagesrc = null;
    this.article = '';
  }

  sendHintMessage(message, color) {
    this.hint.innerHTML = message;
    this.hint.style.color = color;
    setTimeout(()=>{
      this.hint.innerHTML = "";
    },1500);
  }

  sendHintMessageInPost(message, color) {
    this.posthint.innerHTML = message;
    this.posthint.style.color = color;
    setTimeout(()=>{
      this.posthint.innerHTML = "";
      this._EditPostId = -1;
    },1500);
  }

  onSearch(keyword) {
    this.posts = this.postsService.doSearch(keyword, this.postsCopy);
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const image = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);

    let fd = new FormData();
    fd.append('image', image, image.name);
    this.httpService.douploadImage(fd).subscribe((res) => {
       this.imagesrc = res['img'];
       //console.log('img src:', this.imagesrc);
    });
  }



  onCancel() {
    this.imagesrc = null;
    this.imagePreview = null;
    this.article = '';
  }

  onEditPostClick(post) {
    this._EditPostId = post._id;
    this.updateArticleText = post.article;
    this.updatePost = post;
  }

  onAddCommentClick(post) {
    this._CommentPostId = post._id;
    this.updatePost = post;
  }

  onUpdatePost(form: NgForm) {
    if (!form.valid || this.updateArticleText == null || this.updateArticleText === '') {
      return;
    }

    this.isLoading = true;

    this.postsService.updatePost(this._EditPostId, this.updateArticleText)
      .then((data)=>{
        if(data.result == "success") {
          this.updatePost.article = this.updateArticleText;
          this._EditPostId = -1;
          //this.sendHintMessageInPost("Update Success!", "green");
        }
        this.isLoading = false;
      });

  }

  onUpdatePostCancel() {
    this._EditPostId = -1;
  }

  onAddComment(form: NgForm) {
    if (!form.valid || this.addCommentText == null || this.addCommentText === '') {
      return;
    }

    this.isLoading = true;
    this.postsService.addComment(this._CommentPostId, this.addCommentText, this.id)
      .then((data)=>{
        //console.log('res ', data);
        if(data.result == "success") {
          //console.log('new article ', data.articles);
          this.updatePost.comments = data.articles.comments;
          this._CommentPostId = -1;
        }
        this.isLoading = false;
      });
  }

  onAddCommentCancel() {
    this._CommentPostId = -1;
  }

  onModifyClick(now_id, post) {
    this._CommentModifyId = now_id;
    this.updatePost = post;

  }
  onModifyCommentCancel() {
    this._CommentModifyId = -1;
  }

  onModifyComment(form: NgForm) {
    if (!form.valid || this.modifyCommentText == null || this.modifyCommentText === '') {
      return;
    }

    this.isLoading = true;
    this.postsService.modifyComment(this.updatePost._id, this.modifyCommentText, this._CommentModifyId)
      .then((data) => {
        //console.log('res ', data);
        if(data.result == "success") {
          //console.log('modified ', data.articles);
          this.updatePost.comments = data.articles.comments;
          this._CommentModifyId = -1;
        }
        this.isLoading = false;
      });

  }


}
