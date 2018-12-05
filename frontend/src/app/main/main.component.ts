import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HeadlineService} from './headline/headline.service';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor(private router: Router, private headlineService: HeadlineService, private httpService: HttpService) {}

  ngOnInit() {
    this.httpService.doGetCurId().toPromise()
      .then((data)=>{
        //console.log('fb data', data);
        localStorage.setItem('curId', data.id);
      });
  }
  onLogOut() {
    const p = this.headlineService.Logout()
      .then((data) => {
        this.router.navigate(['/auth']);
      });
  }
}
