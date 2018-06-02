import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'

@Injectable()
export class UserService {
  private _getdataUrl = "http://localhost:5001/api/getdata"
  private _getUsersUrl = "http://localhost:5001/api/users"
  private _alterUserUrl = "http://localhost:5001/api/user/"

  constructor(private _http: HttpClient) { }

  getData(topic) {
    const params = new HttpParams().set(`topic`, topic );

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.get(this._getdataUrl, {headers: headers, params: params})
    //return this.http.post<any>(this._registerUrl, body.toString(), { headers, observe: 'response' })
  }

  getUsers(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.get<User[]>(this._getUsersUrl, {headers: headers})
  }

  updateUser(user){
    const body = new HttpParams()
    .set(`username`, user.username)
    .set(`mac_address`, user.mac_address)
    .set(`is_admin`, user.is_admin)
  
  const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

  return this._http.put(this._alterUserUrl + user.id, body.toString(), {headers, observe: 'response' })
  }

  deleteUser(id){
    return this._http.delete(this._alterUserUrl + id)
  }
}

export interface User{
  id: number;
  username: string;
  mac_address: string;
  is_admin: boolean;
}

