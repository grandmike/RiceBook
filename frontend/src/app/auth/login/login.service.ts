import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HttpService} from '../../http.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private http: HttpClient, private httpSerivce: HttpService) { }



    login(netid, password) {
        return this.httpSerivce.doLogin(netid, password).toPromise().then((data) => {
            //console.log(data);
            return Promise.resolve(data);
        })
          .catch((err) => {
              return Promise.resolve(err);
          });
    }

    fb_login() {
        this.httpSerivce.doFBLogin();
    }
}
