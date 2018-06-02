import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material'
import { UserService } from '../../services/user.service'
declare const swal: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private isAdmin: string;
  private loading: boolean;
  private radioIsAdmin = [
    'True',
    'False',
  ];

  private userData = {};

  constructor(private _userService: UserService) { }

  displayedColumns = ['username', 'mac_address', 'is_admin', 'action']
  dataSource = new MatTableDataSource()

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.loading = true
  }

  ngAfterViewInit() {
    this._userService.getUsers()
      .subscribe(
      res => {
        this.dataSource.data = <any>res
        this.loading = false
      },
      err => {
        console.log(err)
      }
      )
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editUser(e) {
    this.userData = e
  }
  editUserSave() {
    console.log(this.userData)
    this._userService.updateUser(this.userData)
      .subscribe(
      res => {
        if (res.body['message'] == 'success') {
          this.openAlert('success', 'Updated!', 'User has been updated').then(res => {
            this.loading = true
            this._userService.getUsers()
              .subscribe(
              res => {
                this.dataSource.data = <any>res
                this.loading = false
              },
              err => {
                this.openAlert('error', 'Error!', err.message)
              }
              )
          })
        }
      },
      err => {
        this.openAlert('error', 'Error!', err.message)
      }
      )
  }

  deleteUser(e) {
    console.log(e)
    swal({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'YES, DELETE IT!'
    }).then(result => {
      if (result.value) {
        this._userService.deleteUser(e.id)
          .subscribe(
          res => {
            if (res['message'] == 'success') {
              this.openAlert('success', 'Deleted!', 'User has been deleted.').then(res => {
                this.loading = true
                this._userService.getUsers()
                  .subscribe(
                  res => {
                    this.dataSource.data = <any>res
                    this.loading = false
                  },
                  err => {
                    this.openAlert('error', 'Error!', err.message)
                  }
                  )
              })
            }
            else {
              this.openAlert('error', 'Error!', res['message'])
            }
          },
          err => {
            this.openAlert('error', 'Error!', err.message)
          }
          )
      }
    });
  }

  openAlert(type, title, msg) {
    switch (type) {
      case 'error':
        return swal({
          title: title,
          text: msg,
          type: 'error',
          confirmButtonClass: 'btn btn-info'
        });
      case 'success':
        return swal({
          title: title,
          text: msg,
          type: 'success',
          confirmButtonClass: 'btn btn-info'
        });
    }
  }
}