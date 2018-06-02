import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service'
import * as decode from 'jwt-decode'
declare const $: any;


@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole

    const token = localStorage.getItem('token')

    const tokenPayload = decode(token)

    if (!this._authService.loggedIn() || tokenPayload.role != expectedRole) {
      this._router.navigate(['login'])
      $.notify({
        message: '<strong>Akses DITOLAK - bukan admin.</strong>',
      }, {
          placement: { align: 'center' },
          offset: { x: 20, y: 35 },
          type: 'danger',
          template: `<div class="alert alert-{0} alert-with-icon col-md-4">
            <i class="material-icons alert-icon">notifications</i>
            <button class="close" type="button" data-dismiss="alert" aria-label="Close"><i class="material-icons">close</i></button>
            <span>{2}</span>
          </div>`
        });
      return false
    }
    return true
  }
}
