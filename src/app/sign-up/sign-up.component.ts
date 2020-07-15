import { UserApiService } from './../user-api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  currentUser: User = { first_name: null, last_name: null, email: null, phone: null, password: null }

  constructor(private userApiService: UserApiService, private router: Router, private local: LocalStorageService) { }

  ngOnInit() { }

  createUser(form) {
    if ((!this.isEmail(this.currentUser.email)) || (this.currentUser.first_name.length > 20) || (this.currentUser.last_name.length > 20) || (this.currentUser.email.length > 30) || (this.currentUser.phone.length != 10) || (this.currentUser.password.length > 16) || (this.currentUser.first_name.length == 0) || (this.currentUser.last_name.length == 0) || (this.currentUser.email.length == 0) || (this.currentUser.password.length == 0)) {
      console.log("Form Invalid");
    } else {
      console.log("Form Valid");
      this.userApiService.createUser(form.value).subscribe((user: User) => {
        this.local.set("Email",user.email);
        this.local.set("FirstName",user.first_name);
        this.local.set("LastName",user.last_name);
        this.local.set("Phone",user.phone);
        console.log("User created ", user);
        console.log("User created " + this.local.get("FirstName"));
        this.ngOnInit();
      });
    }
  }

  isEmail(search: string): boolean {
    var serchfind: boolean;
    var regexp = new RegExp('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/');
    serchfind = regexp.test(search);
    console.log(serchfind);
    return true;
  }

}