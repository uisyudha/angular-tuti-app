import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() title: string;
  constructor(private _auth: AuthService) {}

  ngOnInit() {
  }

  menuClick() {
   // document.getElementById('main-panel').style.marginRight = '260px';
  }

  logout(){
    this._auth.logoutUser()
  }
}
