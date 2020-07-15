import { UserApiService } from './../user-api.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  email: string;
  password: string;

  constructor(private userApiService: UserApiService, private local: LocalStorageService) { }

  ngOnInit(): void {
  }

  loginUser(form) { 
    if (this.email.length == 0 || this.password.length == 0 || this.email.length > 30 || this.password.length > 16) {
      console.log("Form Invalid!");
    } else { 
      console.log("Form Valid!");
      this.userApiService.loginUser(this.email, this.password).subscribe((user: User) => {
        this.local.set("Email",user.email);
        this.local.set("FirstName",user.first_name);
        this.local.set("LastName",user.last_name);
        this.local.set("Phone",user.phone);
        console.log("User login successful ", user);
        console.log("User created " + this.local.get("FirstName"));
        this.ngOnInit();
      });
    }
  }
}
