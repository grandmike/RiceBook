import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HttpService} from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient,  private  httpService: HttpService) { }


  updateZipcode(netid, zipcode) {
    return this.httpService.doUpdateZipcode(netid, zipcode).toPromise().then((data) => {
      return Promise.resolve(data);
    })
      .catch((err) => {
        return Promise.resolve(err);
      });
  }

  updateEmail(netid, email) {
    return this.httpService.doUpdateEmail(netid, email).toPromise().then((data) => {
      return Promise.resolve(data);
    })
      .catch((err) => {
        return Promise.resolve(err);
      });
  }

  updatePassword(netid, password) {
    return this.httpService.doUpdatePassowrd(netid, password).toPromise().then((data) => {
      return Promise.resolve(data);
    })
      .catch((err) => {
        return Promise.resolve(err);
      });
  }
}
