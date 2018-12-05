import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm, NgModel} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ProfileService} from './profile.service';
import {HeadlineService} from '../main/headline/headline.service';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private router: Router, private profileService: ProfileService, private headlineService: HeadlineService
  , private httpService: HttpService) {}
  current_id: string;
  current_email: string;
  current_phone: string;
  current_zipcode: string;
  current_birth: string;
  passwordmatch: boolean;
  imagesrc;
  imagePreview;
  curId;
  hint;
  upload_hint;
  isShowLink;
  isLink;
  link_btn_text;
  ngOnInit() {
    this.imagesrc = null;
    this.hint = document.getElementById("update_hint");
    this.upload_hint = document.getElementById("upload_hint");
    this.curId = localStorage.getItem('curId');
    const tmp = this.curId.split('@');
    if (tmp.length === 1) {
      this.isShowLink = false;
    } else {
      this.isShowLink = true;
    }
    this.httpService.doGetUser(this.curId).toPromise()
      .then((res)=>{
        if (res.result == "success") {
          //console.log('now user' , res.user);
          //console.log(this.isShowLink);
          if (res.user.linkstatus == null || res.user.linkstatus !== 'true') {
            this.isLink = true;
            this.link_btn_text =  'link local account';
          } else {
            this.isShowLink = true;
            this.isLink = false;
            this.link_btn_text = 'unlink local account';
          }
        }
      });
    const promise = this.headlineService.getProfile(this.curId).
      then(data=>{
          if (data.result == "success") {
            this.imagePreview = data.profile.img;
            //console.log(this.imagePreview);
            this.current_id = data.profile.id;
            this.current_email = data.profile.email;
            this.current_phone = data.profile.phone;
            this.current_zipcode = data.profile.zipcode;
            this.current_birth = data.profile.birth;
          }
    });
  }
  onMainPage() {
    this.router.navigate(['main']);
  }

  unmatchPassword(pw: NgModel, pw_c: NgModel) {
    if (pw.value != pw_c.value) {
      this.passwordmatch = false;
      return true;
    }
    this.passwordmatch = true;
    return false;
  }

  onUpdateForm(form: NgForm) {
    if (form.invalid || !this.passwordmatch) {
      return;
    }
    this.profileService.updateZipcode(this.curId, form.value._zipcode)
      .then((data) => {
        if (data.result === "success") {
          this.current_zipcode = form.value._zipcode;
        };
      });

    this.profileService.updateEmail(this.curId, form.value._email)
      .then((data) => {
        if (data.result === "success") {
          this.current_email = form.value._email;
        };
      });

    this.profileService.updatePassword(this.curId, form.value._password)
      .then((data)=>{
        if(data.result == "success") {
          this.sendHintMessage("Update Success!", 'green');
        }
      });

    //console.log(form.value._password);
    form.resetForm();
  }

  sendHintMessage(message, color) {
    this.hint.innerHTML = message;
    this.hint.style.color = color;
    setTimeout(()=>{
      this.hint.innerHTML = "";
      this.router.navigate(['']);
    },1000);
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
    this.httpService.douploadAvatar(fd).subscribe((res) => {
      this.imagesrc = res['img'];
      //console.log('img src:', this.imagesrc);
    });
  }

  onUploadAvatar() {
    if (this.imagesrc == null || this.imagesrc == this.imagePreview) {
      this.sendUploadHintMessage("Please choose a image", 'red');
    } else {
      this.httpService.doUpdateAvatar(this.curId, this.imagesrc).toPromise()
        .then((data)=> {
        if (data.result == 'success') {
          this.sendUploadHintMessage('Update Success!', 'green');
        } else {
          this.sendUploadHintMessage('Update Fail!', 'red');
        }

      })
    }
  }


  sendUploadHintMessage(message, color) {
    this.upload_hint.innerHTML = message;
    this.upload_hint.style.color = color;
    setTimeout(()=>{
      this.upload_hint.innerHTML = "";
    },1000);
  }

  onLinkForm(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.httpService.doLinkAccount(this.curId, form.value._id, form.value._password).toPromise()
      .then((data)=>{
        //console.log('link res', data);
        if(data.result == 'success') {
          this.router.navigate(['/']);
        } else {
          alert(data.result);
        }
      });
  }

  unLink() {
    if (this.isLink == true) {
      return;
    }
    this.httpService.doUpdateUser(this.curId, null, null).toPromise()
      .then((data)=>{
        if(data.result == 'success') {
          this.router.navigate(['/']);
        } else {
          alert(data.result);
        }
      })
  }



}
