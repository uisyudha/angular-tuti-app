import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router'
import { tokenNotExpired } from 'angular2-jwt'

@Injectable()
export class AuthService {

  private _registerUrl = "http://localhost:5001/api/register"
  private _loginUrl = "http://localhost:5001/api/login"

  constructor(private http: HttpClient,
    private _router: Router,
  ) { }

  registerUser(user) {
    const body = new HttpParams()
      .set(`username`, user.username)
      .set(`password`, user.password)
      .set(`mac_address`, user.mac_address);

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post<any>(this._registerUrl, body.toString(), {headers, observe: 'response'})  
  }

  loginUser(user){
    const body = new HttpParams()
      .set(`username`, user.username)
      .set(`password`, user.password);
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post<any>(this._loginUrl, body.toString(), {headers, observe: 'response' })
  }

  logoutUser(){
    localStorage.removeItem('token')
    this._router.navigate(['login'])
  }

  loggedIn(){
    
    return tokenNotExpired()
  }

  getToken(){
    return localStorage.getItem('token')
  }
}
