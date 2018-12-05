import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HttpService} from '../../http.service';
import {Profile} from '../../Profile';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient, private httpSerivce: HttpService) {}

  /**
   * registration
   * @param profile user information
   */
  registration(profile: Profile) {
    return this.httpSerivce.doRegistration(profile).toPromise()
      .then((data) => {
      return Promise.resolve(data);
    })
      .catch((err) => {
        return Promise.resolve(err);
      });
  }
}
