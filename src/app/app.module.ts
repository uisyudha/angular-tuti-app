import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routing } from './app.routes';
import { MatButtonModule, MatRadioModule, MatInputModule, MatMenuModule, MatCheckboxModule, MatIconModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule } from '@angular/material';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GetComponent } from './dashboard/get/get.component';

import 'hammerjs';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FigurecardComponent } from './shared/figurecard/figurecard.component';
import { ImagecardComponent } from './shared/imagecard/imagecard.component';
import { UsersComponent } from './dashboard/users/users.component';
import { MsgIconBtnComponent } from './shared/msgiconbtn/msgiconbtn.component';
import { LoginComponent } from './page/login/login.component';
import { RootComponent } from './dashboard/root/root.component';
import { RegisterComponent } from './page/register/register.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';


import { SettingsService } from './services/settings.service';
import { AuthService } from './services/auth.service'
import { UserService } from './services/user.service'
import { AuthGuard } from './services/auth.guard'
import { LoginGuard } from './services/login.guard'
import { RoleGuard } from './services/role.guard'
import { TokenInterceptorService } from './services/token-interceptor.service'



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    GetComponent,
    NavbarComponent,
    FigurecardComponent,
    ImagecardComponent,
    UsersComponent,
    MsgIconBtnComponent,
    LoginComponent,
    RootComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    BrowserAnimationsModule,
    MatButtonModule,
    MatRadioModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  providers: [SettingsService, AuthService, UserService, AuthGuard, LoginGuard, RoleGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
