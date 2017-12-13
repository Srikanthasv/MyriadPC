import { Injectable, Inject } from '@angular/core';
import { Headers, Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';//new line
import 'rxjs/add/observable/throw';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, JsonpModule } from '@angular/http';
// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { User } from '../login/user';


@Injectable()
export class LoginService {
  public token: string;
  constructor(private http: Http, private router: Router) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(username, password) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Cache-Control', 'no-cache');
    headers.append("Accept", "application/json");
    var params = 'grant_type=password&client_id=js&username=' + username + '&password=' + password + '&client_secret=609642b3-0eee-4254-9f8f-362cd00f7d9d';
    return this.http.post('http://pointcentricapi-local:5000/connect/token', params, { headers: headers })
      .map((response: Response) => {
        let token = response.json() && response.json().refresh_token;
        if (token) {
          this.token = token;
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
          return true;
        } else {
          return false;
        }
      });
  }
  logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
  }
}
