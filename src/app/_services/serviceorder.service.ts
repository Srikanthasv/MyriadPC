import { Injectable, Inject } from '@angular/core';
import { Headers, Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/observable/throw';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, JsonpModule } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ServiceorderService {

  public token: string;

  constructor(private http: Http, private router: Router) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  getOptions(cJType) {
    var codes;
    var token = 'Bearer ';
    token = token.concat(this.token);
    var headers = new Headers();
    if ((cJType || '').trim().length != 0) {
      headers.append("Content-Type", "application/json");
    }
    headers.append("authorization", token);

    let options = new RequestOptions({ headers: headers });
    return options;
  }

  getSOCData() {
    let options = this.getOptions('');
    return this.http.get("http://pointcentricapi-local:5003/api/ServiceStatusCode/", options)
      .map((response: Response) => {
        let Data = response.json() && response.json().Data;
        if (Data) {
          return response.json();
        } else {
          return "";
        }
      });
  }

  submitSOC(body) {
    let options = this.getOptions("ctype");
    return this.http.post("http://pointcentricapi-local:5003/api/ServiceStatusCode", body, options)
      .map((response: Response) => {
        let Data = response.json() && response.json().Data;
        if (Data) {
          return true;
        } else {
          return false;
        }
      });
  }

  updateSOC(Id, body) {
    var strUrl = "http://pointcentricapi-local:5003/api/ServiceStatusCode/";
    strUrl = strUrl.concat(Id)
    let options = this.getOptions("ctype");
    return this.http.put(strUrl, body, options)
      .map((response: Response) => {
        let Data = response.json() && response.json().Data;
        if (Data) {
          return true;
        } else {
          return false;
        }
      });
  }

}
