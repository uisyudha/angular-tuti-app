/**
 * Created by wangdi on 26/5/17.
 */
import { RouterModule, Routes } from '@angular/router';
import { GetComponent } from './dashboard/get/get.component';
import { UsersComponent } from './dashboard/users/users.component';
import { RootComponent } from './dashboard/root/root.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';

import { AuthGuard } from './services/auth.guard'
import { LoginGuard } from './services/login.guard'
import { RoleGuard } from './services/role.guard'

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard', component: RootComponent, canActivate: [AuthGuard],
    children: [
      { path: 'get', component: GetComponent },
      {
        path: 'users', component: UsersComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'admin'
        }
      },
    ]
  }
];

export const routing = RouterModule.forRoot(routes);

