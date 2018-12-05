import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgModel} from '@angular/forms';
import {HeadlineService} from './headline.service';
import {Profile} from '../../Profile';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../../http.service';

@Component({
  selector: 'app-main-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.css']
})
export class HeadlineComponent implements OnInit {
  id: string;
  status: string;
  statusInput: string;
  img: string;
  hint;
  profile: Profile;
  constructor(private router: Router, private headlineService: HeadlineService, private httpService: HttpService) {}

  ngOnInit() {
    this.hint = document.getElementById('headline_hint');
    this.httpService.doGetCurId().toPromise()
      .then((data)=>{
        localStorage.setItem('curId', data.id);
        this.id = data.id;

        this.headlineService.getProfile(this.id)
          .then((data) => {
            //console.log(data);
            if (data.result == "success") {
              this.id = data.profile.id;
              localStorage.setItem('curUsername', data.profile.username);
              this.status = data.profile.status;
              this.img = data.profile.img;
            }
          });
      });

  }


  /**
   * update current status
   */
  onStatusUpdate() {
    this.status = this.statusInput;
    this.headlineService.updateheadline(localStorage.getItem('curId'), this.status).then((data)=>{
      if (data.result == 'success') {
        this.sendHintMessage('Update Success!', 'green');
      } else {
        this.sendHintMessage('Update Fail!', 'red');
      }
      this.statusInput = '';
    });
  }

  /**
   * display hint message
   * @param message
   * @param color
   */
  sendHintMessage(message, color) {
    this.hint.innerHTML = message;
    this.hint.style.color = color;
    setTimeout(()=>{
      this.hint.innerHTML = "";
    },1500);
  }
}
