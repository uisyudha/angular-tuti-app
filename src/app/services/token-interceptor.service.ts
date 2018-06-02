import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import { AuthService } from './auth.service'



@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injcetor: Injector) { }

  intercept(req, next){
    let authService = this.injcetor.get(AuthService)
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
