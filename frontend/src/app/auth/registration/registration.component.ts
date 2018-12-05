import {Component, OnInit} from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';
import {Router} from '@angular/router';
import {Profile} from '../../Profile';
import {RegistrationService} from './registration.service';


@Component({
  selector: 'app-auth-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  emailvalid: boolean;
  passwordmatch: boolean;
  hint;
  constructor(private router: Router, private registrationService: RegistrationService) { }
  ngOnInit() {
    this.emailvalid = false;
    this.passwordmatch = false;
    this.hint = document.getElementById('registration_hint');
  }
  unmatchPassword(pw: NgModel, pw_c: NgModel) {
    if (pw.value != pw_c.value) {
      this.passwordmatch = false;
      return true;
    }
    this.passwordmatch = true;
    return false;
  }

  /**
   * website only open to 18+ people
   * @param birth
   */
  invalidBirth(birth: NgModel) {
    const birth_date = new Date(birth.value);
    const adult = new Date(birth_date.getFullYear() + 18 + '-' +
      (birth_date.getMonth() + 1) + '-' + birth_date.getDate());
    const now = new Date();
    //this.emailvalid = true;
    //return false;
    if (adult > now) {
      this.emailvalid = false;
      return true;
    }
    this.emailvalid = true;
    return false;
  }

  /**
   * registration
   * @param form registration information
   */
  onRegistration(form: NgForm) {
    if (form.invalid || !this.emailvalid || !this.passwordmatch) {
      return;
    }
    const profile: Profile = {
      id: form.value._netid,
      password: form.value._password,
      username: form.value._username,
      email: form.value._email,
      zipcode: form.value._zipcode,
      phone: form.value._phone,
      birth: form.value._birth,
      img: "/assets/1.png",
      status: "I'm new here",
    };
    const promise = this.registrationService.registration(profile);
    promise.then((data) => {
      //console.log('res ' + JSON.stringify(data));
      if (data.result == "success") {

        this.hint.innerHTML = 'Register Success!';
        this.hint.style.color = 'green';
        setTimeout(()=>{
          this.hint.innerHTML = '';
        }, 2000);
      } else {
        this.hint.innerHTML = "Register fail, netid has been used!";
        this.hint.style.color = 'green';
        setTimeout(()=>{
          this.hint.innerHTML = '';
        }, 2000);
      }
    });
    form.resetForm();
  }
}
