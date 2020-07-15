import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  PHP_API_SERVER = "http://127.0.0.1:80";

  constructor(private httpClient: HttpClient) { }

  // readUser(): Observable<User[]> {
  //   return this.httpClient.get<User[]>(`${this.PHP_API_SERVER}/htdocs/backend/readUser.php`);
  // }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.PHP_API_SERVER}/backend/api/createUser.php`, user);
  }

  loginUser(email: string, password: string) { 
    var data1 = {'email': email, 'password': password };
    return this.httpClient.post(`${this.PHP_API_SERVER}/backend/api/loginUser.php`, data1);
  }


  // updateUser(User: User) {
  //   return this.httpClient.put<User>(`${this.PHP_API_SERVER}/htdocs/backend/updateUser.php`, User);
  // }
}
