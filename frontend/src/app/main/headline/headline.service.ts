import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../../http.service';

@Injectable({
    providedIn: 'root'
})
export class HeadlineService {
    Logout() {
        //localStorage.setItem("loginState", "false");
        return this.httpSerivce.doLogout().toPromise().then((data)=>{
          return Promise.resolve(data);
        })
          .catch((err) => {
            return Promise.resolve(err);
          });
    }
  constructor(private http: HttpClient, private httpSerivce: HttpService) { }

  /**
   * get user information
   * @param netid user netid
   */
    getProfile(netid) {
      return this.httpSerivce.doGetProfile(netid).toPromise().then((data) => {
        //console.log(data);
        return Promise.resolve(data);
      })
        .catch((err) => {
          return Promise.resolve(err);
        });
    }

  /**
   * update user status
   * @param netid current user id
   * @param status user status
   */
    updateheadline(netid, status) {
      return this.httpSerivce.doUpdateHeadline(netid, status).toPromise().then((data) => {
        //console.log(data);
        return Promise.resolve(data);
      })
        .catch((err) => {
          return Promise.resolve(err);
        });
    }


}
