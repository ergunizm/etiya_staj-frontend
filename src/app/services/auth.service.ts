import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private username: string = ""
  private email: string = ""

  constructor(private http: HttpClient){}

  login(username: string, password : string) : Observable<{message : string, success : string, data : {username:string, password : string, email : string}}>{
    let params = new HttpParams()
    .append("username", username)
    .append("password", password)

    return this.http.get<{message : string, success : string, data : {username:string, password : string, email : string}}>("http://localhost:8080/users/login", {params:params})
  }

  setUsername(username : string) : void {
    this.username = username
  }

  setEmail(email : string) : void {
    this.email = email
  }

  getUsername() : string {
    return this.username
  }

  getEmail() : string {
    return this.email
  }
}