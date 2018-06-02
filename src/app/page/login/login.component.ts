import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
declare const swal: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {}
  constructor(private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    this._auth.loginUser(this.loginUserData)
      .subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token', res.body.token)
        this._router.navigate(['/dashboard'])
      },
      err => {
        console.log(err)
        this.openAlert()
      }
      )
  }

  openAlert() {
    swal({
      title: 'Error',
      text: 'Login Gagal',
      type: 'error',
      confirmButtonClass: 'btn btn-danger'
    })
  }
}