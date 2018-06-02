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
  private topic: string;


  constructor(private _userService: UserService) { }

  ngOnInit() {

  }

  getData() {
    if (this.dataType == 'Text') {
      this._userService.getData(this.topic)
        .subscribe(
        res => {
          this.result = res.toString();
          console.log(res)
        },
        err => {
          console.log(err)
        }
        )
    }
    else {
      this._userService.getData(this.dataType.toLowerCase())
        .subscribe(
        res => {
          this.result = res.toString();
          console.log(res)
        },
        err => {
          console.log(err)
        }
        )
    }
  }



}
