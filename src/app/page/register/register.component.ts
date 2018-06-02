import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'
declare const swal: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {}
  constructor(private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  register() {
    this._auth.registerUser(this.registerUserData)
      .subscribe(
      res => {
        console.log(res)
        if (res.body.message == 'success') this.openAlert('success', 'Register Success')
      },
      err => {
        console.log(err)
        this.openAlert('error', err.error.message)
      }
      )
  }

  openAlert(type, msg) {
    switch (type) {
      case 'success':
        swal({
          title: 'Success!',
          text: msg,
          type: 'success',
          confirmButtonClass: 'btn btn-success'
        }).then(() => {
          this._router.navigate(['/'])
        });
        break;
      case 'error':
        swal({
          title: 'Error',
          text: msg,
          type: 'error',
          confirmButtonClass: 'btn btn-danger'
        })
        break;
    }
  }
}
