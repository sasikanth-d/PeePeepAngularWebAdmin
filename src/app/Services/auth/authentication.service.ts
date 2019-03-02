import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';


@Injectable()

export class AuthenticationService {

  usertoken: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(private _http: HttpClient) { }

  login(username: string, password: string) {
    const reqheaders = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True' });
    // reqheaders = reqheaders.append('Content-Type', 'application/x-www-form-urlencoded');
    const data = 'username=' + username + '&password=' + password + '&grant_type=password';
    // let params: HttpParams = new HttpParams();
    // params = params.append('username', username);
    // params = params.append('password', password);
    // params = params.append('grant_type', 'password');
    return this._http.post<any>('http://localhost:54547/login', data, { headers: reqheaders }).
      pipe(map(obj => {
        if (obj && obj.access_token) {
          localStorage.setItem('user_token', obj.access_token);
          this.usertoken.next(obj.access_token);
          localStorage.setItem('username', username);
          localStorage.setItem('lastAction', Date.now().toString());
        }
      }));
  }

  logout() {
    localStorage.removeItem('user_token');
    localStorage.removeItem('username');
  }

  isAuthenticated() {
    if (localStorage.getItem('user_token') == null) {
      return false;
    }
    return true;
  }

}
