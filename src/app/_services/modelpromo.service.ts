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
export class ModelpromoService {

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

  getMPData() {
    let options = this.getOptions('');
    return this.http.get(AppSettings.CATALOGENDPOINT +"api/ProductModelPromotionCode/", options)
      .map((response: Response) => {
        let Data = response.json() && response.json().Data;
        if (Data) {
          return response.json();
        } else {
          return "";
        }
      });
  }

  submitMP(body) {
    let options = this.getOptions("ctype");
    return this.http.post(AppSettings.CATALOGENDPOINT +"api/ProductModelPromotionCode", body, options)
      .map((response: Response) => {
        let Data = response.json() && response.json().Data;
        if (Data) {
          return true;
        } else {
          return false;
        }
      });
  }

  updateMP(Id, body) {
    var strUrl = AppSettings.CATALOGENDPOINT +"api/ProductModelPromotionCode/";
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
