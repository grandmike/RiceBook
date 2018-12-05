import {Component, OnInit} from '@angular/core';
import {FollowingService} from './following.service';
import {PostsService} from '../posts/posts.services';
import {Profile} from '../../Profile';
import set = Reflect.set;
import {HttpService} from '../../http.service';

@Component({
  selector: 'app-main-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {
  curFollowingId = [];
  curFollowing = [];
  newfollowing: string;
  curId;
  hint;
  isLoading = false;
  constructor(private followingService: FollowingService, private postsService: PostsService, private httpService:HttpService) { }

  ngOnInit() {
    this.isLoading = true;
    this.hint = document.getElementById('hint');
    this.httpService.doGetCurId().toPromise()
      .then((data)=>{
        //console.log('fb data', data);
        localStorage.setItem('curId', data.id);
        this.curId = data.id;
        this.getFollowing();
        this.isLoading = false;
      });

  }

  getFollowing() {
    const promise = this.followingService.getfollowing(this.curId)
    promise.then(data => {
      if (data.result == "success") {
        //console.log('following data ', data);
        this.curFollowingId = data.following.following;
        //console.log('following', this.curFollowingId);
        for (let i = 0; i < this.curFollowingId.length; i++) {
          const p = this.followingService.getProfile(this.curFollowingId[i].id);
          p.then(data => {
            if (data.result == "success") {
              this.curFollowing.push(data.profile);
            }
          });
        }
        setTimeout(() => {
          this.followingService.updatePost(this.curId, this.curFollowingId);
        }, 200);
      }
    });

  }


  onAdd() {
    if (this.newfollowing == this.curId) {
      this.sendHintMessage('You can not follow yourself!', "red");
        return;
    }
    for (let j = 0; j < this.curFollowingId.length; j++) {
        if (this.curFollowingId[j].id == this.newfollowing) {
          this.sendHintMessage('You have already follow ' + this.newfollowing + '!', "red");
          return;
        }
    }

    const p = this.followingService.addfollowing(this.curId, this.newfollowing);
    p.then(data => {
      if (data.result == "success") {
        this.curFollowingId.push({id:this.newfollowing});

        const t = this.followingService.getProfile(this.newfollowing);
        t.then(data => {
          if (data.result == "success") {
            this.curFollowing.push(data.profile);
          }
        });

        this.followingService.updatePost(this.curId, this.curFollowingId);

        this.sendHintMessage('Add Success!', "green");
      } else {
        this.sendHintMessage('User not find!', "red");
      }
    });

  }

  sendHintMessage(message, color) {
    this.hint.innerHTML = message;
    this.hint.style.color = color;
    setTimeout(()=>{
      this.hint.innerHTML = "";
    },1500);
  }

  onUnfollow(profile) {
    const p = this.followingService.deletefollowing(this.curId, profile.id);
    p.then(data => {
      if (data.result == "success") {
        for (let i = 0; i < this.curFollowingId.length; i++) {
          if (this.curFollowingId[i].id == profile.id) {
            this.curFollowingId.splice(i, 1);
            this.curFollowing.splice(i, 1);
            break;
          }
        }
        this.sendHintMessage("Unfollow Success!", "green");
      }
      this.followingService.updatePost(this.curId, this.curFollowingId);
    });

  }
}
