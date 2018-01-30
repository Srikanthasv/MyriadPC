import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { JsonService } from '../_services/json.service';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
  providers: [JsonService]

})
export class SidemenuComponent implements OnInit {
  pages: any = [];
  ismenuactive: boolean = false;
  active: boolean = false;
  showMenu: boolean = false;
  selected: any;
  route: string;
  page: string = "home";
  color: string = "#515253";

  constructor(location: Location, router: Router, private jsonService: JsonService) {
    router.events.subscribe((val) => {
      //console.log("location :: " + location.path());
      if (location.path() === undefined) {
        this.route = 'home';
        //AppSettings. isHeader
      } else {
        this.route = location.path();
      }
    });
    //console.log("route:: " + this.route);

    if (this.route === undefined) {
      //console.log("Path3:: " + this.route);
      this.route = 'home';
      this.page = 'home';
    }
    else if (this.route !== '' || this.route !== null) {
      var splitted = this.route.split("/");
      //console.log("Path2:: " + this.route + " :: " + splitted);
      this.page = splitted[splitted.length - 1];
    }

    this.jsonService.getSideMenuJson().subscribe(res => {
      this.pages = res;

    },
      err => {
        console.log("error loading sidemenu json:" + err);
      }
    );

  }

  ngOnInit() {
    
  }



  toggleView(ary, data, index) {
    if (this.route != '') {
      //console.log("Path :: " + this.route);
      var splitted = this.route.split("/");
      this.page = splitted[splitted.length - 1];
    }
    for (var i = 0; i < ary.length; i++) {

      if (i != index) {
        ary[i].expanded = false;
      }
      else {
        data.expanded = !data.expanded;
      }
    }

  }

}
