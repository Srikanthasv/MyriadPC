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
import { AppSettings } from './AppSettings';

@Injectable()
export class CountryService {
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

  getCountries() {
    let options = this.getOptions('');
    return this.http.get(AppSettings.MONOLITHENDPOINT + "api/AddressCountry/", options)
      .map((response: Response) => {
        let Data = response.json() && response.json().Data;
        if (Data) {
          return response.json();
        } else {
          return "";
        }
      });
  }

  getStates()
  {
    let options = this.getOptions('');
    return this.http.get(AppSettings.MONOLITHENDPOINT + "api/AddressState/", options)
      .map((response: Response) => {
        let Data = response.json() && response.json().Data;
        if (Data) {
          return response.json();
        } else {
          return "";
        }
      });
  }

}
