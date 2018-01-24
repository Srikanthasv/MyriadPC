import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class JsonService {
  public sidemenuPath: string = './assets/data/sidemenu.json';
  constructor(private http: Http) { }

  public getSideMenuJson() {
        return this.http.get(this.sidemenuPath)
      .map((response: Response) => {
        console.log("sidemenu="+response);
        let Data = response.json() ;
        if (Data) {
          return response.json();
        } else {
          return "";
        }
      });
      
  }

}