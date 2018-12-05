import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from './login.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  hint;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.hint = document.getElementById('login_hint');
    this.initLocalStorage();
  }
  initLocalStorage() {
    localStorage.setItem('curId', '');
  }
  /**
   * login in
   */
  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const id = form.value._id;
    const password = form.value._password;
    const promise = this.loginService.login(id, password);
    promise.then((data) => {
      if (data.result == "success") {
        localStorage.setItem('curId', data.id);
        localStorage.setItem('curState', 'login');
        this.hint.innerHTML = 'Login in Success!';
        this.hint.style.color = 'green';
        setTimeout(() => {
          this.hint.innerHTML = "";
           this.router.navigate(['/main']);
         }, 1500);
      } else {
        this.hint.innerHTML = 'Invalid netid or password';
        this.hint.style.color = 'red';
      }
    });

  }
  /**
   * login in with facebook account
   */
  onFBLogin() {
    this.loginService.fb_login();
  }
}