import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {
  private dataType: string;
  private radioDataType = [
    'Text',
    'Gambar',
  ];
  private token = localStorage.getItem('token')
  private result: string;


  constructor(private _userService: UserService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    const activeTabs = document.getElementsByClassName('default-active');
    for (let i = 0; i < activeTabs.length; i++) {
      (<HTMLElement>activeTabs[i]).click();
    }
  }

  tabClick(evt, id) {
    const tabcontents = document.querySelectorAll('.h-tab .tab-content');
    for (let i = 0; i < tabcontents.length; i++) {
      (<HTMLElement>tabcontents[i]).style.display = 'none';
    }
    const tablinks = document.querySelectorAll('.h-tab .tab-link');
    for (let i = 0; i < tablinks.length; i++) {
      const tablink = <HTMLElement>tablinks[i];
      tablink.className = tablink.className.replace(' active', '');
    }
    document.getElementById(id).style.display = 'block';
    evt.currentTarget.className += ' active';
  }
  vTabClick(evt, id) {
    const tabcontents = document.querySelectorAll('.v-tab .tab-content');
    for (let i = 0; i < tabcontents.length; i++) {
      (<HTMLElement>tabcontents[i]).style.display = 'none';
    }
    const tablinks = document.querySelectorAll('.v-tab .tab-link');
    for (let i = 0; i < tablinks.length; i++) {
      const tablink = <HTMLElement>tablinks[i];
      tablink.className = tablink.className.replace(' active', '');
    }
    document.getElementById(id).style.display = 'block';
    evt.currentTarget.className += ' active';
  }

  getData() {
    this._userService.getData(this.dataType.toLowerCase())
      .subscribe(
      res => {
        this.result = JSON.stringify(res)
        console.log(res)
      },
      err => {
        console.log(err)
      }
      )
  }



}
