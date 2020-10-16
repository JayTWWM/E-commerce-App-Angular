import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  first_name: string;
  last_name: string;
  email: string;
  phone: string;

  constructor(private local: LocalStorageService, private router: Router) { }

  ngOnInit(): void {
    this.first_name = this.local.get("FirstName");
    this.last_name = this.local.get("LastName");
    this.email = this.local.get("Email");
    this.phone = this.local.get("Phone");
  }

  signOut(): void { 
    this.local.clear();
    this.router.navigate(['/']);
  }

}
